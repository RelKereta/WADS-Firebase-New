import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import EditTodoForm from "./EditToDoForm";

const TodoList = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    if (!user) return;

    const userTodosRef = collection(db, "users", user.uid, "todos");

    const unsubscribe = onSnapshot(userTodosRef, (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [user]);

  const addToDo = async (task) => {
    if (!user) return;

    await addDoc(collection(db, "users", user.uid, "todos"), {
      task,
      completed: false,
      createdAt: new Date()
    });
  };

  const toggleComplete = async (id, completed) => {
    if (!user) return;

    const taskRef = doc(db, "users", user.uid, "todos", id);
    await updateDoc(taskRef, { completed: !completed });
  };

  const deleteToDo = async (id) => {
    if (!user) return;

    const taskRef = doc(db, "users", user.uid, "todos", id);
    await deleteDoc(taskRef);
  };

  const editToDo = (id, task) => {
    setEditingTask({ id, task });
  };

  const updateTask = async (id, newTask) => {
    if (!user) return;

    const taskRef = doc(db, "users", user.uid, "todos", id);
    await updateDoc(taskRef, { task: newTask });

    setEditingTask(null); // Exit edit mode
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-6">
      <h1 className="text-2xl font-semibold text-center mb-4 text-black">To-Do List</h1>
      <TodoForm addToDo={addToDo} />

      <button
        onClick={() => setShowCompleted(!showCompleted)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
      >
        {showCompleted ? "Show All Tasks" : "Show Completed Tasks"}
      </button>

      <div className="space-y-3">
        {todos
          .filter((todo) => (showCompleted ? todo.completed : true))
          .map((todo) =>
            editingTask?.id === todo.id ? (
              <EditTodoForm key={todo.id} updateTask={updateTask} task={editingTask} />
            ) : (
              <Todo key={todo.id} task={todo} toggleComplete={toggleComplete} deleteToDo={deleteToDo} editToDo={editToDo} />
            )
          )}
      </div>
    </div>
  );
};

export default TodoList;
