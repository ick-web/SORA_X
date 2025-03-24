"use client";

import Link from "next/link";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const SignupForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const onSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const nickname = formData.get("nickname") as string;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { user_nickname: nickname } },
    });

    if (error) {
      setError(error.message);
      setSuccess(false);
    } else {
      setError(null);
      setSuccess(true);
      router.push("/login"); // 회원가입 성공 시 로그인 페이지 이동
    }
  };

  return (
    <div className="w-[400px] bg-neutral-800 text-white p-8 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-center mb-6">회원가입</h3>

      <form action={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-3 bg-zinc-600 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="이메일을 입력해주세요"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="w-full p-3 bg-zinc-600 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="비밀번호를 입력해주세요"
            required
          />
        </div>
        <div>
          <label htmlFor="nickname">Nickname</label>
          <input
            type="text"
            name="nickname"
            className="w-full p-3 bg-zinc-600 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="닉네임을 입력해주세요"
            required
          />
        </div>
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold text-lg">
          회원가입
        </button>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mt-2">
            회원가입 성공! 로그인하세요.
          </p>
        )}
      </form>

      <div className="text-center mt-4">
        <p className="text-gray-400 text-sm">
          이미 가입했어요!
          <Link href="/login">
            <button className="ml-2 bg-orange-500 text-white py-1 px-3 rounded-lg text-sm hover:bg-orange-600">
              로그인
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
