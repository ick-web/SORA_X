import AuthForm from "@/components/(login,signup)/Form";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex flex-row justify-center items-center bg-black">
      <AuthForm mode="login" />
    </div>
  );
};

export default LoginPage;
