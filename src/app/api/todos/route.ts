import prisma from "@/lib/Prisma";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";



export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const skip = Number(searchParams.get("skip") || 0)
  const take = Number(searchParams.get("take") || 10)

  if (isNaN(skip) || isNaN(take)) {
    return NextResponse.json({ error: "Invalid query parameters" }, { status: 400 });
  }

  const todos = await prisma.todo.findMany({ skip, take });
  return NextResponse.json(todos);
}


const postSchema = yup.object({
  description: yup.string().required(),
  completed: yup.boolean().optional().default(false),
})

export async function POST(request: NextRequest) {
  try {

    const { completed, description } = await postSchema.validate(await request.json())

    const todo = await prisma.todo.create({ data: { completed, description } });

    return NextResponse.json(todo);

  } catch (error) {

    return NextResponse.json(error, { status: 400 });

  }
}

export async function DELETE(request: NextRequest) {
  try {

    await prisma.todo.deleteMany({
      where: {
        completed: true
      }
    });
    return NextResponse.json({ message: "Deleted completed todos" });

  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}