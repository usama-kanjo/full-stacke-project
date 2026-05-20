import React, { useState } from "react";
import { Input, type InputProps } from "@/components/atoms/Input";

export interface PasswordInputProps extends Omit<InputProps, "type" | "rightIcon" | "onRightIconClick"> {}

export const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const [show, setShow] = useState(false);

  return (
    <Input
      type={show ? "text" : "password"}
      rightIcon={(
        <span style={{ fontSize: "1.1em" }}>
          {show ? "👁️" : "👁️‍🗨️"}
        </span>
      )}
      onRightIconClick={() => setShow(prev => !prev)}
      {...props}
    />
  );
};

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
