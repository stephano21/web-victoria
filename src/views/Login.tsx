import React, { useContext } from "react";
import { CardLogin } from "../components/CardLogin";
import { useRequest } from "../api/UseRequest";
import { TokenResponse } from "../interfaces/AuthInterface";
import { Endpoints } from "../api/routes";
import { useAuth } from "./../context/AuthContext";
import { AlertContext, AlertType } from "../context/AlertContext";
import useToaster from "../hooks/useToaster";

export const Login = () => {
  const { postRequest } = useRequest();
  const { login } = useAuth();
  const { notify } = useToaster()
  const Login = async (username: string, password: string) => {
   
    if (username === '' || password === '') {
      //alert("Rellene todos los campos""Rellene todos los campos");\
      return  notify(
        `Rellene todos los campos`,"warning"
      )
    }
    await postRequest<TokenResponse>(Endpoints.login, {
      username,
      password,
    })
      .then((e) => {
        e.user=username;
        login(e);
        console.log(e);
      })
      .catch((error) => console.log(error));
  };

  const isLogin = (username: string, password: string) => {
   
    Login(username, password).then(() => {}
    //(window.location.href = "/home")
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage:
          //"conic-gradient(at center top, rgb(17, 24, 39), rgb(88, 28, 135), rgb(124, 58, 237))",
          //"linear-gradient(to right, rgb(16, 185, 129), rgb(101, 163, 13))"
          //"linear-gradient(to right, #92fe9d, #00c9ff)"
          "radial-gradient(circle, rgba(0,85,60,1) 20%, rgba(114,176,29,1) 100%)",

      }}
    >
     
      <CardLogin onLogin={isLogin}></CardLogin>
    </div>
  );
};
