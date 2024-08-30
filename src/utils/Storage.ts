import AsyncStorage from '@react-native-async-storage/async-storage';

export const save = async (key: string, value: string) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error('Error saving data', e);
  }
};

export const load = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.error('Error loading data', e);
    return null;
  }
};

export const remove = async (key: string) => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Error removing data', e);
  }
};

export const clear = async () => {
  try {
    return await AsyncStorage.clear();
  } catch (e) {
    console.error('Error clearing data', e);
  }
};
