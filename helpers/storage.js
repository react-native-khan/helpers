import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = (key, value) =>
  AsyncStorage.setItem(key, JSON.stringify(value));

export const getItem = async (key) => {
  const object = await AsyncStorage.getItem(key);
  return JSON.parse(object);
};

export const clearStorage = () => {
  AsyncStorage.clear();
};
