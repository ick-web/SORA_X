import AuthForm from "@/components/(login,signup)/Form";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="flex flex-row justify-center items-center bg-black ">
      <AuthForm mode="signup" />
    </div>
  );
};

export default SignUpPage;
