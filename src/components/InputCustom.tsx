import React, { ChangeEvent, ReactNode, useState } from "react";

interface InputProps<T extends string | number> {
  type?: string;
  bclass?: string;
  placeholder?: string;
  label?: ReactNode;
  value?: string | number;
  onChange?: (value: T) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

export function Input<T>({
  type,
  placeholder,
  bclass,
  label,
  value,
  onChange,
  onBlur,
  onFocus,
}: InputProps<string | number>) {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      const typedValue = event.target.value as unknown as T;
      if (typeof typedValue === "string" || typeof typedValue === "number") {
        onChange(typedValue);
      }
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      {label && <label className="form-label">{label}</label>}
      <input
        className={bclass || ""}
        type={type === "password" && showPassword ? "text" : type || ""}
        placeholder={placeholder || ""}
        value={value === undefined ? "" : value}
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {type === "password" && (
        <div className="password-toggle" onClick={handleTogglePassword}>
          {showPassword ? <i className="bi bi-eye-slash"></i>: <i className="bi bi-eye-fill"></i>}
        </div>
      )}
    </div>
  );
}

//export default Input;
