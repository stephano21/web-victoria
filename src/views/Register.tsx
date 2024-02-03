import React from "react";
import { CardRegister } from "../components/CardRegister";
import { useRequest } from "../api/UseRequest";
import { IRegister, TokenResponse } from "../interfaces/AuthInterface";
import { Endpoints } from "../api/routes";
import { useAuth } from "./../context/AuthContext";

export const Register = () => {
  const { postRequest } = useRequest();
  const { login } = useAuth();

  const Register = async (data:IRegister) => {
    await postRequest<TokenResponse>(Endpoints.register,data )
      .then((e) => {
        //login(e.access_token);
        console.log(e);
      })
      .catch((error) => console.log(error));
  };

  const isLogin = (dataUser: IRegister) => {
    Register(dataUser).then(() => {}
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
      <CardRegister onRegister={isLogin}></CardRegister>
    </div>
  );
};
