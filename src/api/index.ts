import { AxiosResponse } from "axios";
import { instance } from "./axios";
import { ToastOptions, toast } from "react-toastify";

interface PostApiResponse extends AxiosResponse {
  message?: string;
  success?: boolean;
  // data: any;
}

export const routePostApi = async (
  apiRoute,
  params
): Promise<PostApiResponse> => {
  try {
    const response = await instance.post(apiRoute, params);
    console.log("responsesad", response);
    if (response.data.message) {
      toastContainer(response.status, "Success");
      // toastContainer(response.status, response.data.message);
    }
    return { ...response, success: true };
  } catch (error) {
    // console.log("error", error.response);
    if (error?.response?.status && error?.response?.data?.message) {
      toastContainer(error.response.status, error.response.data.message);
    } else {
      toast("Server error, please try again");
    }
    return error?.response?.data;
  }
};

export const routeGetApi = async (apiRoute) => {
  try {
    const response = await instance.get(apiRoute);
    return response;
  } catch (error) {
    if (error?.response?.status && error?.response?.data?.message) {
      toastContainer(error.response.status, error.response.data.message);
    } else {
      toast("Server error, please try again");
    }
  }
};

export const routeUpdateApi = async (apiRoute, params) => {
  try {
    const response = await instance.put(apiRoute, params);
    if (response.data.message) {
      toastContainer(response.status, response.data.message);
    }
    return response;
  } catch (error) {
    if (error?.response?.status && error?.response?.data?.message) {
      toastContainer(error.response.status, error.response.data.message);
    } else {
      toast("Server error, please try again");
    }
  }
};

const toastContainer = (status, message) => {
  let errMessage = "Server error, please try again";
  let action = "success";
  console.log("status", status);
  console.log("message", message);

  const toastParams: ToastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  switch (status) {
    case 200:
      errMessage = message;
      action = "success";
      break;
    case 201:
      errMessage = message;
      action = "success";
      break;
    case 422:
      errMessage = message;
      action = "error";
      break;
    case 401:
      errMessage = message;
      action = "error";
      break;
    case 403:
      errMessage = message;
      action = "error";
      break;
    default:
      errMessage = "Server error, please try again";
      action = "error";
      break;
  }
  if (action === "success") {
    toast.success(errMessage, toastParams);
  } else {
    toast.error(errMessage, toastParams);
    if (status === 403) {
      localStorage.removeItem("auth-token");
    }
  }
};
