import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();

  const { userId, todoId } = body;

  const prisma = new PrismaClient();

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user)
      return NextResponse.json({ message: "not Authorized" }, { status: 500 });

    const deleteRes = await prisma.todo.delete({
      where: {
        id: todoId,
      },
    });

    return NextResponse.json(
      {
        message: "success",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "failure",
        error: error,
      },
      { status: 200 }
    );
  }
};
