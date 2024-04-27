import prisma from "@/app/lib/Prisma";
import { NextRequest, NextResponse } from "next/server";

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


export async function POST(request: NextRequest) {
  const body = await request.json();
  const todo = await prisma.todo.create({ data: body });
  return NextResponse.json(todo);
}