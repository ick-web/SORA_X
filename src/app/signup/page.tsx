import AuthForm from "@/components/Form";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="flex flex-row justify-center items-center bg-black ">
      <AuthForm mode="signup" />;
    </div>
  );
};

export default SignUpPage;
