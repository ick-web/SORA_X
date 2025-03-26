import LoginForm from "@/components/(login,signup)/LoginForm";
import Sora from "@/components/(login,signup)/Sora";

const LoginPage = () => {
  return (
    <div className="flex flex-row justify-evenly p-8 items-center bg-black">
      <Sora />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
