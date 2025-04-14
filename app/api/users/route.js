import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req) => {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(
      {
        message: "success",
        users: users,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
