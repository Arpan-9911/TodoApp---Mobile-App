import express from 'express';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../controllers/todoController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/get', auth, getTodos);
router.post('/add', auth, addTodo);
router.patch('/update/:id', auth, updateTodo);
router.delete('/delete/:id', auth, deleteTodo);

export default router;
