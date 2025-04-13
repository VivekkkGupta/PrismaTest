import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();
  const { userId, todoId, updatedTitle,completed } = body;

  const prisma = new PrismaClient();
  try {
    const user = await prisma.user.findUnique({
      where:{
        id: userId,
      }
    });

    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 500 });

    const updatedTodo = await prisma.todo.upsert({
      where: {
        id: todoId,
      },
      update: {
        title: updatedTitle,
        completed:completed
      },
      create: {
        id: todoId,
        title: updatedTitle,
        userId: userId,
        completed: completed
      },
    });


    return NextResponse.json({
      message: "Success",
      todos: updatedTodo,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "failure",
      error: error,
    });
  }
};
