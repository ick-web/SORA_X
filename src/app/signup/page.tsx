import SignupForm from "@/components/(login,signup)/SignUpForm";
import Sora from "@/components/(login,signup)/Sora";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="wrapper w-full h-screen overflow-hidden flex flex-col justify-center items-center">
      <div className="rounded-3xl w-full h-full flex flex-row justify-evenly p-8 items-center bg-black">
        <Sora />
        <SignupForm />
      </div>
    </div>
  );
};

export default SignUpPage;
