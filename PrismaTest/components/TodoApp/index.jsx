import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Header from "@/components/Header";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import axios from "axios";

export default function TodoApp() {
  const { user } = useUser();
  const [todos, setTodos] = useState([]);
  
  const getTodos = async () => {
    if (!user) {
      return;
    }
    const res = await axios.post("/api/get-todos", {
      userId: user.id,
    });
    setTodos(res?.data?.message);
  };

  useEffect(() => {
    getTodos();
  }, [user]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container flex-1 py-8">
        <div className="mx-auto max-w-3xl">
          <AddTodo setTodos={setTodos} />
          <TodoList todos={todos} setTodos={setTodos} />
        </div>
      </div>
    </div>
  );
}