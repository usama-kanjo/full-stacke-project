import type { z } from "zod";
import {
  type ChangeEvent,
  type FormEvent,
  useCallback,
  useState,
} from "react";
import useDebounce from "./useDebounce";

interface UseFormConfig<T extends Record<string, unknown>> {
  schema: z.ZodType<T>;
  fieldSchemas: { [K in keyof T]?: z.ZodType<T[K]> };
  initialValues: Partial<T>;
  debounceMs?: number;
}

export default function useForm<T extends Record<string, unknown>>({
  schema,
  fieldSchemas,
  initialValues,
  debounceMs = 300,
}: UseFormConfig<T>) {
  const [values, setValues] = useState<T>(initialValues as T);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const debouncedValidate = useDebounce(
    (field: keyof T, value: unknown) => {
      const fieldSchema = fieldSchemas[field];
      if (!fieldSchema) {
        return;
      }

      const result = fieldSchema.safeParse(value);
      setErrors((prev) => {
        const next = { ...prev };
        if (result.success) {
          delete next[field];
        }
        else {
          next[field] = result.error.issues[0].message;
        }
        return next;
      });
    },
    debounceMs,
  );

  const handleChange = useCallback(
    (field: keyof T) => (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value as T[keyof T];
      setValues(prev => ({ ...prev, [field]: val }));
      debouncedValidate(field, val);
    },
    [debouncedValidate],
  );

  const handleBlur = useCallback(
    (field: keyof T) => () => {
      setTouched(prev => ({ ...prev, [field]: true }));
    },
    [],
  );

  const getFieldProps = useCallback(
    (field: keyof T & string) => ({
      value: String(values[field] ?? ""),
      onChange: handleChange(field),
      onBlur: handleBlur(field),
      error: touched[field] ? errors[field] : undefined,
    }),
    [values, errors, touched, handleChange, handleBlur],
  );

  const validateAll = useCallback(() => {
    setTouched((prev) => {
      const next = { ...prev };
      for (const key of Object.keys(initialValues)) {
        next[key as keyof T] = true;
      }
      return next;
    });

    const result = schema.safeParse(values);
    if (result.success) {
      setErrors({});
      return { success: true as const, data: result.data };
    }

    const fieldErrors: Partial<Record<keyof T, string>> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof T;
      if (!fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    setErrors(fieldErrors);
    return { success: false as const, errors: fieldErrors };
  }, [schema, values, initialValues]);

  const handleSubmit = useCallback(
    (onValid: (data: T) => void | Promise<void>) =>
      async (e: FormEvent) => {
        e.preventDefault();
        const result = validateAll();
        if (result.success) {
          await onValid(result.data);
        }
      },
    [validateAll],
  );

  return {
    values,
    errors,
    touched,
    getFieldProps,
    validateAll,
    handleSubmit,
    setValues,
    setErrors,
  };
}
