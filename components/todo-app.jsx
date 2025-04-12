"use client";
import { useEffect, useState } from "react"
import { Edit, Trash2, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Header from "@/components/header"
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

export default function TodoApp() {

  const { user } = useUser()


  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState("")

  const addTodo = async () => {
    if (newTodo.trim() === "") return

    const todo = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    }

    setTodos([...todos, todo])
    const res = await axios.post("/api/set-todos", {
      title: newTodo,
      userId: user.id
    }
    )
    console.log(res)
    setNewTodo("")
    if (res.status !== 200) {
      toast.error("Error saving in DB")
      return
    }

    toast.success("Todo Added")
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos(todos.map(
      (todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    ))
  }

  const startEdit = (todo) => {
    setEditingId(todo.id)
    setEditText(todo.text)
  }

  const saveEdit = () => {
    if (editText.trim() === "") return

    setTodos(
      todos.map((todo) => (todo.id === editingId ? { ...todo, text: editText } : todo))
    )
    setEditingId(null)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo()
    }
  }

  const getTodos = async () => {
    if (!user) {
      return
    }
    const res = await axios.post("/api/get-todos", {
      userId: user.id
    })
    console.log(res?.data?.message)
    setTodos(res?.data?.message)
  }
  useEffect(() => {
    getTodos()
  }, [user])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container flex-1 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-center gap-2">
            <Input
              type="text"
              placeholder="Add a new todo..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1" />
            <Button onClick={addTodo} className="bg-primary hover:bg-primary/90">
              Add
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead className="w-[150px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center text-muted-foreground">
                      No todos yet. Add one above!
                    </TableCell>
                  </TableRow>
                ) : (
                  todos.map((todo) => (
                    <TableRow key={todo.id} className={todo.completed ? "bg-muted/50" : ""}>
                      <TableCell
                        className={`${todo.completed ? "line-through text-muted-foreground" : ""}`}>
                        {editingId === todo.id ? (
                          <Input
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onBlur={saveEdit}
                            onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                            autoFocus />
                        ) : (
                          todo.title
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => toggleComplete(todo.id)}
                            className="h-8 w-8">
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Mark as {todo.completed ? "incomplete" : "complete"}</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => startEdit(todo)}
                            disabled={editingId === todo.id}
                            className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => deleteTodo(todo.id)}
                            className="h-8 w-8 text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
