import supabase from "@/app/supabase/client";
import { User } from "@supabase/supabase-js";

export const uploadImageToSupabase = async (
  file: File
): Promise<string | null> => {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("sorax-img")
      .upload(fileName, file);

    if (uploadError) {
      console.error("이미지 업로드 실패:", uploadError);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from("sorax-img")
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  } catch (error) {
    console.error("이미지 처리 중 오류 발생:", error);
    return null;
  }
};

export const getAnswerFromSupabase = async (user: User | null) => {
  if (!user) {
    console.error("사용자 정보가 없습니다.");
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("answers")
      .select("*")
      .eq("answer_user_id", user.id)
      .order("answer_created_at", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error("최신 답변 가져오기 실패:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("최신 답변 조회 중 오류 발생:", error);
    return null;
  }
};

export const validateImage = (file: File): boolean => {
  if (file.size > 5 * 1024 * 1024) {
    alert("5MB 이하의 이미지만 업로드 가능합니다.");
    return false;
  }

  if (!file.type.startsWith("image/")) {
    alert("이미지 파일만 업로드 가능합니다.");
    return false;
  }

  return true;
};

export const resetFormState = (
  setQuestion: (value: string) => void,
  setPreviewUrl: (value: string) => void
) => {
  setQuestion("");
  setPreviewUrl("");
};
