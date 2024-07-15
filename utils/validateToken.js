// src/utils/validateToken.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const validateToken = async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    console.log('Token is valid',token);
    // Optionally, validate the token here (e.g., by sending a request to the server)
    return token;
  }
  return null;
};

export default validateToken;
