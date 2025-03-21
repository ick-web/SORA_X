import AuthForm from "@/components/(login,signup)/Form";
import Sora from "@/components/(login,signup)/Sora";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex flex-row justify-evenly p-8 items-center bg-black">
      <Sora />
      <AuthForm mode="login" />
    </div>
  );
};

export default LoginPage;
