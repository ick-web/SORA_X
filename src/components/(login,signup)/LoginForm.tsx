"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import supabase from "@/app/supabase/client";
import { useAuthStore } from "@/stores/store";

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

    const { data: userData,error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      if(userData?.user){
        setUser(userData.user) // Zustand 상태 업데이트
      }

      router.push("/"); // 로그인 성공 시 홈 이동
    }
  };

  return (
    <div className="w-[400px] bg-neutral-800 text-white p-8 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-center mb-6">로그인</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            className="w-full p-3 bg-zinc-600 text-white border border-gray-700 rounded-lg"
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
      <div className="text-center mt-4">
        <p className="text-gray-400 text-sm">
          아직 계정이 없으신가요?
          <Link href="/signup">
            <button className="ml-2 bg-orange-500 text-white py-1 px-3 rounded-lg text-sm hover:bg-orange-600">
              회원가입
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
