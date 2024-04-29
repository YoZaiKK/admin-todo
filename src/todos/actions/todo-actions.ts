'use server'

import prisma from "@/lib/Prisma"
import { Todo } from "@prisma/client"
import { revalidatePath } from "next/cache"

const sleep = (seconds: number = 0): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, seconds * 1000)
  }
  );
}

export const toggleTodo = async (id: string, completed: boolean): Promise<Todo> => {
  await sleep(3)
  const todo = await prisma.todo.findFirst({
    where: { id }
  })

  if (!todo) {
    throw new Error('Todo not found')
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { completed }
  })

  revalidatePath('/dashboard/server-todos')
  return updatedTodo
}

export const addTodo = async (description: string): Promise<Todo> => {
  try {


    const todo = await prisma.todo.create({ data: { description } });
    revalidatePath('/dashboard/server-todos')

    return todo;

  } catch (error) {

    throw new Error('Error creating todo')

  }
}

export const deleteCompleted = async (): Promise<void> => {
  try {
    await prisma.todo.deleteMany({
      where: {
        completed: true
      }
    });
    revalidatePath('/dashboard/server-todos')
  } catch (error) {
    throw new Error('Error deleting todos')
  }
}
