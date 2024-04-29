import prisma from "@/lib/Prisma";
import { Todo } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import * as yup from 'yup'

interface Segments {
  params: {
    id: string
  }
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const todo = await prisma.todo.findFirst({ where: { id } })
  return todo;
}

export async function GET(request: NextRequest, { params }: Segments) {
  const elTodo = await getTodo(params.id)

  if (!elTodo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }
  return NextResponse.json(elTodo);
}


const putSchema = yup.object({
  description: yup.string().optional(),
  completed: yup.boolean().optional(),
})


export async function PUT(request: NextRequest, { params }: Segments) {
  const { id } = params;
  const todo = await getTodo(id)

  if (!todo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }
  try {

    const body = await putSchema.validate(await request.json())

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: body
    })

    return NextResponse.json(updatedTodo);
  } catch (e) {
    return NextResponse.json(e, { status: 400 })
  }

}