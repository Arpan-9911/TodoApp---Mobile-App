const todoReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];

    case 'DELETE_TODO':
      return state.filter(todo => todo._id !== action.payload);

    case 'UPDATE_TODO':
      return state.map(todo =>
        todo._id === action.payload._id ? action.payload : todo
      );

    case 'FETCH_TODOS':
      return action.payload;

    default:
      return state;
  }
}

export default todoReducer;