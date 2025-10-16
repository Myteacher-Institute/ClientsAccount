import { Platform } from 'react-native';

let baseUrl;

Platform.OS === 'android'
  ? (baseUrl = 'http://192.168.18.10:3000/api/v1/')
  : (baseUrl = 'http://localhost:3000/api/v1/');

export default baseUrl;
