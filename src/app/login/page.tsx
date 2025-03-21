import AuthForm from "@/components/Form";
import React from "react";

const LoginPage = () => {
return(
<div className="flex flex-row justify-center items-center bg-black">
  <AuthForm mode="login" />;
</div>
)
}

export default LoginPage;
