import prisma from "@/app/lib/Prisma";
import { NextResponse, NextRequest } from "next/server";

interface Segments {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: Segments) {
  const elTodo = await prisma.todo.findUnique({
    where: {
      id: params.id
    }
  });

  if (!elTodo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }
  return NextResponse.json(elTodo);
}
