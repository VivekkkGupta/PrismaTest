import { NextResponse } from 'next/server';

export async function POST(request) {
  const { userId } = await request.json();

  // Simulate fetching todos from a database or external API
  const todos = [
    { id: 1, title: 'Sample Todo 1', completed: false },
    { id: 2, title: 'Sample Todo 2', completed: true },
  ];

  // Filter todos by userId if necessary
  const userTodos = todos.filter(todo => todo.userId === userId);

  return NextResponse.json({ message: userTodos });
}