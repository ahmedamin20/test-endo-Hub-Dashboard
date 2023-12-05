import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { ToastContainer, toast } from 'react-toastify';
const VALIDATION_ERRORS_RESPONSE = 422;
const UNAUTHENTICATED_ERROR = 401;

export const defaultAPI = axios.create({
  baseURL: process.env.API,
});

const isServer = () => {
  return typeof window === "undefined";
};

let locale = "";
let context = <GetServerSidePropsContext>{};

export const setLocale = (_locale: string) => {
  locale = _locale;
};

export const getLocale = () => locale;

export const setContext = (_context: GetServerSidePropsContext) => {
  context = _context;
};

defaultAPI.interceptors.response.use(
  function (response) {
    const SHOW_TOAST = response.data.showToast;

    if (SHOW_TOAST) {
      toast.dismiss();
      toast.success(response.data.message);
    }

    return response;
  },
  function (error) {
    const STATUS_CODE = error.response.status;
    if (STATUS_CODE === VALIDATION_ERRORS_RESPONSE) {
      const responseErrors = error.response.data.data;

      const firstErrorKey = Object.keys(responseErrors)[0];
      toast.dismiss();

      toast.error(`${responseErrors[firstErrorKey]}`);
    } else if (
      STATUS_CODE === UNAUTHENTICATED_ERROR &&
      error.config.url !== "/auth/login/dashboard"
    ) {
      localStorage.removeItem("AccessToken");
      return (window.location.href = "/");
    } else {
      toast.dismiss();
      toast.error(error.response.data.message);
    }

    return Promise.reject(error);
  }
);

defaultAPI.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "AccessToken"
    )}`;
    if (!isServer()) {
      config.headers.Locale = getLocale() || "en";
    }
    if (isServer() && context?.req?.cookies) {
      config.headers.Locale = context?.req?.cookies?.NEXT_LOCALE || "en";
    }
    config.headers.Accept = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
