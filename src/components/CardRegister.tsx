import React, { useState } from "react";
import { Card } from "./Card";
import { GenericForm } from "./Form";
interface CardRegisterProps {
  onLogin: (username: string, password: string) => void;
}

export const CardRegister = ({ onLogin }: CardRegisterProps) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = () => {
    // Realiza alguna lógica de autenticación aquí
    onLogin(formData.username, formData.password);
  };
  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <Card title="Registrarse" footer={null} image={null}>
      <GenericForm
        fields={[
          {
            name: "cedula",
            label: "Numero de cedula",
            bclass: "form-control",
            placeholder: "Numero de cedula",
            value: formData.username, // Establece el valor de username desde el estado formData
            onChange: (value) => handleInputChange("cedula", value), // Maneja los cambios en el username
          },
          {
            name: "nombre",
            label: "Nombres",
            bclass: "form-control",
            placeholder: "Nombres",
            value: formData.username, // Establece el valor de username desde el estado formData
            onChange: (value) => handleInputChange("cedula", value), // Maneja los cambios en el username
          },
          {
            name: "apellido",
            label: "Apellidos",
            bclass: "form-control",
            placeholder: "Apellidos",
            value: formData.username, // Establece el valor de username desde el estado formData
            onChange: (value) => handleInputChange("apellido", value), // Maneja los cambios en el username
          },
          {
            name: "username",
            label: "Nombre de Usuario",
            bclass: "form-control",
            placeholder: "Nombre de usuario",
            value: formData.username, // Establece el valor de username desde el estado formData
            onChange: (value) => handleInputChange("username", value), // Maneja los cambios en el username
          },
          {
            name: "password",
            label: "Contraseña",
            bclass: "form-control",
            placeholder: "Contraseña",
            type: "password",
            value: formData.password, // Establece el valor de password desde el estado formData
            onChange: (value) => handleInputChange("password", value), // Maneja los cambios en el password
          },
          {
            name: "remenber",
            bclass: "form-check-input",
            type: "checkbox",
            label: "Recordarme?",
            value: formData.password, // Establece el valor de password desde el estado formData
            onChange: (value) => handleInputChange("password", value), // Maneja los cambios en el password
          },
        ]}
        onSubmit={handleLogin}
      />
      <a href="/auth/login" >Iniciar sesión</a>
    </Card>
  );
};
