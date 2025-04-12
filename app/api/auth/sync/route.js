
import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req) => {
  const user = await currentUser();

  if (!user) return new Response("Unauthorized", { status: 401 });
  try {
    const { id: clerkId, emailAddresses, fullName, imageUrl } = user;

    const email = emailAddresses[0]?.emailAddress ?? "";

    const dbUser = await prisma.user.upsert({
      where: { id:clerkId },
      update: {
        name: fullName,
        email,
        avatar: imageUrl,
      },
      create: {
        id:clerkId,
        name: fullName,
        email,
        avatar: imageUrl,
      },
    });

    return NextResponse.json(
      {
        message: "Created / Updated User",
        user: dbUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Error Sycning DB",
        error: error,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
