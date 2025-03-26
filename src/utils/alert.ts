import Swal from "sweetalert2";

export const AlertSuccess = (
  title: string = "Success",
  text: string = ""
): void => {
  Swal.fire({
    icon: "success",
    title,
    text,
    customClass: {
      popup: "swal-custom", // 팝업 스타일링
      icon: "swal-icon", // 아이콘 스타일링
    },
  });
};

export const AlertError = (
  title: string = "Error",
  text: string = ""
): void => {
  Swal.fire({
    icon: "error",
    title,
    text,
  });
};

export const AlertInfo = (title: string = "Info", text: string = ""): void => {
  Swal.fire({
    icon: "info",
    title,
    text,
  });
};

export const AlertCheck = (
  title: string = "Warning",
  text: string = "이 작업은 되돌릴 수 없습니다!",
  confirmButtonText: string = "삭제",
  confirmedTitle: string = "Deleted",
  confirmedText: string = "삭제되었습니다."
): Promise<boolean> => {
  return new Promise((resolve) => {
    Swal.fire({
      icon: "warning",
      title,
      text,
      showCancelButton: true,
      confirmButtonColor: "color-green",
      cancelButtonColor: "color-orange2",
      confirmButtonText,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: confirmedTitle,
          text: confirmedText,
          icon: "success",
        });
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};
