import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export const setItem = async (key, value) =>
  await AsyncStorage.setItem(key, JSON.stringify(value));

export const getItem = async (key) => {
  const object = await AsyncStorage.getItem(key);
  return JSON.parse(object);
};

export const clearStorage = async () => {
  const asyncStorageKeys = await AsyncStorage.getAllKeys();
  if (asyncStorageKeys.length > 0) {
    if (Platform.OS === "android") {
      await AsyncStorage.clear();
    }
    if (Platform.OS === "ios") {
      await AsyncStorage.multiRemove(asyncStorageKeys);
    }
  }
};
