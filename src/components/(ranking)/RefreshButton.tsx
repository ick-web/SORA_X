"use client";

import { TbRefresh } from "react-icons/tb";
import { refreshData } from "@/utils/ranking/server-action";
import React from "react";
import Swal from "sweetalert2";

const onRefreshHandler = () => {
  refreshData();
  Swal.fire({ title: "업데이트를 완료했습니다.", icon: "success" });
};

const RefreshButton = () => {
  return (
    <button onClick={onRefreshHandler}>
      <TbRefresh className="w-5 h-5 hover:text-color-orange1" />
    </button>
  );
};

export default RefreshButton;
