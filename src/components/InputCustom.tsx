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
  accept?: string; // Nueva propiedad para especificar tipos de archivo aceptados
}

export function Input<T>({
  type = "text",
  placeholder,
  bclass,
  label,
  value,
  onChange,
  onBlur,
  onFocus,
  accept, // Añade accept a las props
}: InputProps<string | number>) {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLInputElement>) => {
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
            type === "file" ? (
              // Utiliza la propiedad 'accept' para especificar los tipos de archivo aceptados
              <input
                className={bclass || ""}
                type="file"
                placeholder={placeholder || ""}
                accept={accept} // Usa la propiedad 'accept' aquí
                onChange={(event) => {
                  if (onChange) {
                    const typedValue = event.target.files;
                    onChange(typedValue as unknown as T);
                  }
                }}
              />
            ) : (
              <input
                className={bclass || ""}
                type={type}
                placeholder={placeholder || ""}
                value={value === undefined ? "" : value}
                onChange={handleChange}
                onBlur={onBlur}
                onFocus={onFocus}
              />
            )
          )}
        </>
      )}
    </div>
  );
}
