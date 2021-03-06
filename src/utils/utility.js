import { toast } from "react-toastify";

const toastParams = {
  position: "bottom-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export function showSuccessToastMessage(toastMessage) {
  toast.success(toastMessage, { ...toastParams });
}

export function showErrorToastMessage(errorMessage) {
  toast.error(`${errorMessage}`, {
    ...toastParams,
  });
}
