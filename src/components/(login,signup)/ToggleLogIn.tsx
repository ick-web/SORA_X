"use client";

import { useAuthStore } from "@/stores/store";
import { useRouter } from "next/navigation";
import supabase from "@/app/supabase/client";

const ToggleLogIn = () => {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    logout(); // Zustand 상태 초기화
    router.push("/login"); // 로그인 페이지로 이동
  };

  const handleLogIn = async () => {
    router.push("/login");
  };

  return (
    <div>
      {user === null ? (
        <button
          onClick={handleLogIn}
          className="w-56 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg"
        >
          로그인
        </button>
      ) : (
        <button
          onClick={handleLogout}
          className="w-56 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg"
        >
          로그아웃
        </button>
      )}
    </div>
  );
};

export default ToggleLogIn;
