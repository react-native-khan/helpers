import axios from "axios";
import { BASE_URL } from "@env";
import {
  getItem,
  clearStorage,
  navigator,
  logTelegram,
  log,
} from "../helpers";

export const request = async (options) => {
  log(`🔥 Request::${JSON.stringify(options)}`);
  const token = await getItem('token');
  const config = {
    baseURL: options?.base || BASE_URL,
    headers: {
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      // ...(options?.data?.type === 'file' && {
      //   'Content-Type': 'multipart/form-data',
      // }),
    },
  };
  const client = axios.create(config);
  log(`🤖 Config::${JSON.stringify(config)}`);
  const onSuccess = (res) => {
    !options?.noLogTelegram &&
      logTelegram(
        `🔥 Request::${JSON.stringify(options)}`,
        `🤖 Config::${JSON.stringify(config)}`,
        `🌈 Response::${JSON.stringify(res?.data || res)}`
      );
    log(`🌈 Response::${JSON.stringify(res?.data || res)}`);
    return Promise.resolve(res?.data || res);
  };

  const onError = (error) => {
    if (error?.response?.status === 401) {
      clearStorage();
      navigator.resetTo("login");
    }
    !options?.noLogTelegram &&
      logTelegram(
        `🔥 Request::${JSON.stringify(options)}`,
        `🤖 Config::${JSON.stringify(config)}`,
        `💀 Response::${JSON.stringify(
          error?.response?.data || error?.response || error
        )}`
      );
    log(
      `💀 Response::${JSON.stringify(
        error?.response?.data || error?.response || error
      )}`
    );
    return Promise.reject(error?.response?.data || error?.response || error);
  };
  return client(options).then(onSuccess).catch(onError);
};
