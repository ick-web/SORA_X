import LoginForm from "@/components/(login,signup)/LoginForm";
import Sora from "@/components/(login,signup)/Sora";

const LoginPage = () => {
  return (
    <div className="wrapper w-full h-screen overflow-hidden flex flex-col justify-center items-center">
      <div className="rounded-3xl w-full h-full flex flex-row justify-evenly p-8 items-center bg-black">
        <Sora />
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
