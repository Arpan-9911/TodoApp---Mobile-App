import * as api from './index.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const sendOTP = (authData) => async () => {
  try {
    await api.sendOTP(authData);
  } catch (error) {
    const message = error.response?.data?.message || "OTP Sent Failed";
    return Promise.reject(new Error(message));
  }
};

export const verifyOTP = (authData) => async (dispatch) => {
  try {
    const { data } = await api.verifyOTP(authData);
    await AsyncStorage.setItem('profile', JSON.stringify(data));
    dispatch({ type: 'AUTH', payload: data });
  } catch (error) {
    const message = error.response?.data?.message || "OTP Verification Failed";
    return Promise.reject(new Error(message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem('profile');
    dispatch({ type: 'LOGOUT' });
  } catch (error) {
    const message = error.response?.data?.message || "Logout Failed";
    return Promise.reject(new Error(message));
  }
};