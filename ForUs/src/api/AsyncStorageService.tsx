import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUserId = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value.toString());
    console.log('Número guardado con éxito');
  } catch (error) {
    console.error('Error al guardar el número:', error);
  }
};

// Recuperar el ID del usuario
export const getUserId = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return parseInt(value, 10); // Convierte el valor a entero
    }
    console.log('No se encontró el número');
    return null;
  } catch (error) {
    console.error('Error al obtener el número:', error);
    return NaN; // Manejo de errores
  }
};