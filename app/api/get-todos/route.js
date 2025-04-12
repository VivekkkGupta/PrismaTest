import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export const POST = async (req) => {
    const body = await req.json()
    const {userId:clerkId} = body;
    try {
        const user = await prisma.user.findUnique({
          where:{
            id: clerkId
          }
        })
        if(!user){
          return NextResponse.json({ message: "Not Authorized" },{status:500})
        }

        const todos = await prisma.todo.findMany({
            where:{
                userId: clerkId
            }
        })
        return NextResponse.json({ message: todos },{status:200})
    } catch (error) {
        console.log("Failed: ",error)
        return NextResponse.json({
            message: error.message,
        },{status:500})
    }
    finally{{
        await prisma.$disconnect()
    }}

}