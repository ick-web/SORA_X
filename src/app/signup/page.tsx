import SignupForm from "@/components/(login,signup)/SignUpForm";
import Sora from "@/components/(login,signup)/Sora";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="flex flex-row justify-evenly p-8 items-center bg-black">
      <Sora />
      <SignupForm />
    </div>
  );
};

export default SignUpPage;
