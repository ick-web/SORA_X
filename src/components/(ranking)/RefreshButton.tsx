"use client";

import { useRouter } from "next/navigation";
import React from "react";

const RefreshButton = () => {
  const router = useRouter();

  return (
    <button
      className="border-2 border-color-orange1 rounded-md text-color-orange1 p-2"
      onClick={() => router.refresh()}
    >
      새로고침
    </button>
  );
};

export default RefreshButton;
