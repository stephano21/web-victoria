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
      {type === "checkbox" ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            id="checkbox"
            className={bclass || ""}
            type="checkbox"
            placeholder={placeholder || ""}
            value={value === undefined ? "" : value}
            onChange={handleChange}
            onBlur={onBlur}
            onFocus={onFocus}
          />
          {label && <label style={{ marginLeft: "5px" }} htmlFor="checkbox">{label}</label>}
        </div>
      ) : (
        <>
          {label && <label className="form-label">{label}</label>}
          {type === "password" ? (
            <div style={{ display: "flex" }}>
              <input
                className={bclass || ""}
                type={showPassword ? "text" : "password"}
                placeholder={placeholder || ""}
                value={value === undefined ? "" : value}
                onChange={handleChange}
                onBlur={onBlur}
                onFocus={onFocus}
              />
              <div className="password-toggle" onClick={handleTogglePassword}>
                {showPassword ? (
                  <i className="bi bi-eye-slash"></i>
                ) : (
                  <i className="bi bi-eye-fill"></i>
                )}
              </div>
            </div>
          ) : (
            <input
              className={bclass || ""}
              type={type || ""}
              placeholder={placeholder || ""}
              value={value === undefined ? "" : value}
              onChange={handleChange}
              onBlur={onBlur}
              onFocus={onFocus}
            />
          )}
        </>
      )}
    </div>
  );
}
