import React, { memo, useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import { Input, type InputProps } from "@/components/atoms/Input";

export interface PasswordInputProps extends Omit<InputProps, "type" | "rightIcon" | "onRightIconClick"> {}

export const PasswordInput = memo<PasswordInputProps>((props) => {
  const [show, setShow] = useState(false);

  return (
    <Input
      type={show ? "text" : "password"}
      rightIcon={<Icon name={show ? "eye" : "eyeOff"} />}
      onRightIconClick={() => setShow(prev => !prev)}
      {...props}
    />
  );
});

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
