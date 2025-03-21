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

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>{mode === "signup" ? "회원가입" : "로그인"}</h3>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          {...register("email", { required: "이메일을 입력해주세요" })}
          name="email"
          placeholder="이메일을 입력해주세요"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="text"
          {...register("password", { required: "비밀번호를 입력해주세요" })}
          name="password"
          placeholder="비밀번호를 입력해주세요"
        />
      </div>
      {mode === "signup" && (
        <div>
          <label htmlFor="nickname">Nickname</label>
          <input
            type="text"
            {...register("nickname")}
            name="nickname"
            placeholder="닉네임을 입력해주세요"
          />
        </div>
      )}
      <button>{mode === "signup" ? "회원가입" : "로그인"}</button>

      <div>
        {mode === "signup" ? (
          <Link href="/login">
            <p>이미 계정이 있으신가요?</p>
            <button>로그인</button>
          </Link>
        ) : (
          <Link href="/signup">
            <p>아직 계정이 없으신가요?</p>
            <button>회원가입</button>
          </Link>
        )}
      </div>
    </form>
  );
};

export default AuthForm;
