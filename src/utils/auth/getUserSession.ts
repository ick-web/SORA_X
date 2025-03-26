import supabase from "@/app/supabase/client";

export const getUserSession = async () => {
  const {
    data,
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("사용자 정보를 가져오는 데 실패했습니다.", error);
    return null;
  }

  return data;
};
