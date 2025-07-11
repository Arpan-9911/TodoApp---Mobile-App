import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = axios.create({ baseURL: 'http://192.168.31.128:5000' })
API.interceptors.request.use(async (req) => {
  const profile = await AsyncStorage.getItem('profile');
  if (profile) {
    req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
  }
  return req;
})

// Auth
export const sendOTP = (authData) => API.post('/auth/sendOTP', authData)
export const verifyOTP = (authData) => API.post('/auth/verifyOTP', authData)

// Todos
export const fetchTodos = () => API.get('/todos/get')
export const createTodo = (todoData) => API.post('/todos/add', todoData)
export const updateTodo = (id) => API.patch(`/todos/update/${id}`)
export const deleteTodo = (id) => API.delete(`/todos/delete/${id}`)