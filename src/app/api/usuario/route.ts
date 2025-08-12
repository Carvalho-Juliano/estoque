import { User } from "@/model/Usuario";
import { userService } from "@/services/userService";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await User.findAll();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar Usuarios" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const registerNewUser = await userService.create(body);
    return NextResponse.json(registerNewUser, { status: 201 });
  } catch (err: any) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Erro ao criar usuário!" },
      { status: 500 }
    );
  }
}
