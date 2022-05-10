import { BOT_CLIENT_URL, BOT_CLIENT_ID, APP_NAME, ENV } from "@env";
import DeviceInfo from "react-native-device-info";

export const logTelegram = (...args) => {
  const Phone = `${DeviceInfo.getBrand()} ${DeviceInfo.getModel()}, ${DeviceInfo.getDeviceId()}`;
  let today = new Date();
  const time = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  let url = `${BOT_CLIENT_URL}log?chatId=${BOT_CLIENT_ID}&clientName=${APP_NAME}`;
  fetch(url, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      `🦄 ID::${DeviceInfo.getUniqueId()}`,
      `📱 Phone::${Phone}`,
      `⏰ Time::${time}`,
      "===========================",
      ...args,
    ]),
  });
};

export const log = (...args) => {
  ENV === "DEV" && console.log(...args);
};

export const logger = (...args) => {
  logTelegram(...args);
  log(...args);
};
