"use client";

import { refreshData } from "@/utils/ranking/server-action";
import React from "react";

const RefreshButton = () => {
  return (
    <button className="border-2 border-color-orange1 rounded-md text-color-orange1 p-2" onClick={() => refreshData()}>
      업데이트
    </button>
  );
};

export default RefreshButton;
