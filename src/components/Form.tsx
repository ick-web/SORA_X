"use client";

import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
  nickname?: string;
};

type AuthFormProps = {
  mode: "login" | "signup";
};

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {};

  return (
    <div className="w-[400px] bg-neutral-800 text-white p-8 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-center mb-6">
        {mode === "signup" ? "회원가입" : "로그인"}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 ">
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: "이메일을 입력해주세요" })}
            className="w-full p-3 bg-zinc-600 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="이메일을 입력해주세요"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", { required: "비밀번호를 입력해주세요" })}
            className="w-full p-3 bg-zinc-600 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="비밀번호를 입력해주세요"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        {mode === "signup" && (
          <div>
            <label htmlFor="nickname">Nickname</label>
            <input
              type="text"
              {...register("nickname")}
              name="nickname"
              className="w-full p-3 bg-zinc-600 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="닉네임을 입력해주세요"
            />
            {errors.nickname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nickname.message}
              </p>
            )}
          </div>
        )}
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold text-lg">
          {mode === "signup" ? "회원가입" : "로그인"}
        </button>
      </form>
      <div className="text-center mt-4">
        <p className="text-gray-400 text-sm">
          {mode === "signup" ? "이미 가입했어요!" : "아직 계정이 없으신가요?"}
          <Link href={mode === "signup" ? "/login" : "/signup"}>
            <button className="ml-2 bg-orange-500 text-white py-1 px-3 rounded-lg text-sm hover:bg-orange-600">
              {mode === "signup" ? "로그인" : "회원가입"}
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
