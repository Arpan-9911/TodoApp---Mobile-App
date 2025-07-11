import * as api from './index.js';

export const fetchTodos = () => async (dispatch) => {
  try {
    const { data } = await api.fetchTodos();
    dispatch({ type: 'FETCH_TODOS', payload: data });
  } catch (error) {
    const message = error.response?.data?.message || "Failed to fetch todos";
    return Promise.reject(new Error(message));
  }
};

export const createTodo = (todoData) => async (dispatch) => {
  try {
    const { data } = await api.createTodo(todoData);
    dispatch({ type: 'ADD_TODO', payload: data });
  } catch (error) {
    const message = error.response?.data?.message || "Failed to create todo";
    return Promise.reject(new Error(message));
  }
};

export const updateTodo = (id) => async (dispatch) => {
  try {
    const { data } = await api.updateTodo(id);
    dispatch({ type: 'UPDATE_TODO', payload: data });
  } catch (error) {
    const message = error.response?.data?.message || "Failed to update todo";
    return Promise.reject(new Error(message));
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    await api.deleteTodo(id);
    dispatch({ type: 'DELETE_TODO', payload: id });
  } catch (error) {
    const message = error.response?.data?.message || "Failed to delete todo";
    return Promise.reject(new Error(message));
  }
};