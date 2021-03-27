import AsyncStorage from "@react-native-community/async-storage";
import { useEffect, useState } from "react";

export function useAsyncStorage(
  key: string,
  defaultValue: string
): [string, (newValue: string) => Promise<void>, boolean] {
  const [state, setState] = useState({
    synced: false,
    storageValue: defaultValue,
  });
  const { synced, storageValue } = state;

  async function pullFromStorage() {
    const fromStorage = await AsyncStorage.getItem(key);
    let value = defaultValue;
    if (fromStorage) {
      value = fromStorage;
    }
    setState({ synced: true, storageValue: value });
  }

  async function updateStorage(newValue: string) {
    await AsyncStorage.setItem(key, newValue);
    await pullFromStorage();
  }

  useEffect(() => {
    pullFromStorage();
  }, []);

  return [storageValue, updateStorage, synced];
}
