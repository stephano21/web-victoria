import React, { useState } from "react";
import { Card } from "./Card";
import { GenericForm } from "./Form";
import { IRegister } from "../interfaces/AuthInterface";
interface CardRegisterProps {
  //onLogin: (username: string, password: string) => void;
  onRegister: (dataUser: IRegister) => void
}

export const CardRegister = ({ onRegister }: CardRegisterProps) => {
  const [formData, setFormData] = useState<IRegister>({
    cedula: "",
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    Id_Hacienda: 1,
  });

  const handleLogin = () => {
    onRegister(formData);
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
            value: formData.cedula, // Establece el valor de username desde el estado formData
            onChange: (value) => handleInputChange("cedula", value), // Maneja los cambios en el username
          },
          {
            name: "first_name",
            label: "Nombres",
            bclass: "form-control",
            placeholder: "Nombres",
            value: formData.first_name, // Establece el valor de username desde el estado formData
            onChange: (value) => handleInputChange("first_name", value), // Maneja los cambios en el username
          },
          {
            name: "last_name",
            label: "Apellidos",
            bclass: "form-control",
            placeholder: "Apellidos",
            value: formData.last_name, // Establece el valor de username desde el estado formData
            onChange: (value) => handleInputChange("last_name", value), // Maneja los cambios en el username
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
            name: "email",
            label: "Correo",
            bclass: "form-control",
            inputType:"email",
            placeholder: "Nombre de usuario",
            value: formData.email, // Establece el valor de username desde el estado formData
            onChange: (value) => handleInputChange("email", value), // Maneja los cambios en el username
          },
          {
            name: "password",
            label: "Contraseña",
            bclass: "form-control",
            placeholder: "Contraseña",
            inputType: "password",
            value: formData.password, // Establece el valor de password desde el estado formData
            onChange: (value) => handleInputChange("password", value), // Maneja los cambios en el password
          },
          {
            name: "remenber",
            bclass: "form-check-input",
            inputType: "checkbox",
            label: "Recordarme?",
            value: formData.password, // Establece el valor de password desde el estado formData
            onChange: (value) => handleInputChange("remenber", value), // Maneja los cambios en el password
          },
        ]}
        onSubmit={handleLogin}
      />
      <a href="/auth/login" >Iniciar sesión</a>
    </Card>
  );
};
