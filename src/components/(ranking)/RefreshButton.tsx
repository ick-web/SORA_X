"use client";

import { TbRefresh } from "react-icons/tb";
import { refreshData } from "@/utils/ranking/server-action";
import React from "react";

const RefreshButton = () => {
  return (
    <button onClick={() => refreshData()}>
      <TbRefresh className="w-5 h-5 hover:text-color-orange1" />
    </button>
  );
};

export default RefreshButton;
