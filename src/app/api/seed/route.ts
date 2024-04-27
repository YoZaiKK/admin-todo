import prisma from "@/app/lib/Prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();

  await prisma.todo.createMany({
    data: [
      { description: "Buy groceries", completed: true },
      { description: "Walk the dog" },
      { description: "Do laundry" },
      { description: "Clean the house" }
    ],
  });


  return NextResponse.json({ message: "Seed executed" });
}