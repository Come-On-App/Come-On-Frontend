import react from 'react';
import * as SecureStore from 'expo-secure-store';

export async function save(key: string, value: string) {
  console.log(value);
  await SecureStore.setItemAsync(key, value);
}

export async function deleteValueFor(key: string) {
  await SecureStore.deleteItemAsync(key);
}

export async function getValueFor(key: string) {
  const result = await SecureStore.getItemAsync(key);

  return result;
}
