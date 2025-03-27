"use client";

import { useRouter } from "next/navigation";
import React, { useLayoutEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import supabase from "@/app/supabase/client";
import { useAuthStore } from "@/stores/store";
import { AlertError } from "@/utils/alert";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [error, setError] = useState<string | null>(null); //서버 오류 저장

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    const { email, password } = data;

    const { data: userData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      if (userData?.user) {
        setUser(userData.user); // Zustand 상태 업데이트
      }

      router.push("/"); // 로그인 성공 시 홈 이동
      return;
    }
  };

  // 로그인 상태일때 로그인페이지로 가는 걸 막는 로직
  useLayoutEffect(() => {
    const checkUser = async () => {
      const { data: userData, error } = await supabase.auth.getUser();
      if (error) throw Error;
      if (userData) {
        AlertError("잘못된 접근입니다.");
        router.push("/");
      }
    };

    checkUser();
  }, []);

  return (
    <div className="w-[450px] h-4/6 bg-neutral-800 text-white py-12 px-10 rounded-2xl">
      <h3 className="text-2xl font-bold text-center mb-12">로그인</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 이메일 입력 */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", { required: "이메일을 입력해주세요" })}
            className="w-full p-3 bg-zinc-600 text-white border border-gray-700 rounded-lg"
            placeholder="이메일을 입력해주세요"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* 비밀번호 입력 */}
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", { required: "비밀번호를 입력해주세요" })}
            className="w-full p-3 bg-zinc-600 text-white border border-gray-700 rounded-lg mb-4"
            placeholder="비밀번호를 입력해주세요"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold">
          로그인
        </button>

        {/* 서버 오류 메시지 */}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </form>

      {/* 회원가입 링크 */}
      <div className="text-center mt-8">
        <p className="text-gray-400 text-sm">
          아직 계정이 없으신가요?
          <Link href="/signup">
            <button className="ml-2 border border-color-orange1 text-color-orange1 py-2 px-3 rounded-full font-medium text-sm transition-all duration-300 hover:bg-color-orange2 hover:text-white">
              회원가입
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
