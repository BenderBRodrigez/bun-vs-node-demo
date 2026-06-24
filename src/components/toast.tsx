import { ToastContainer } from "react-toastify";
import { twMerge } from "tailwind-merge";

const contextClass = {
  success: "bg-green-200",
  error: "bg-red-200",
  info: "bg-blue-200",
  warning: "bg-blue-200",
  default: "bg-blue-200",
};

export const Toast = () => (
  <ToastContainer
    position="bottom-right"
    closeButton={false}
    draggable={false}
    hideProgressBar={true}
    toastClassName={(context) =>
      twMerge([
        "flex p-4 m-3 text-sm text-white rounded-md",
        contextClass[context?.type || "default"],
      ])
    }
  />
);
