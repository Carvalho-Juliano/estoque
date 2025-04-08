import { Usuario } from "@/model/Usuario";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const usuarios = await Usuario.findAll();
    return NextResponse.json(usuarios);
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
    const { email, senha } = body;
    if (typeof email !== "string" || typeof senha !== "string") {
      return NextResponse.json(
        {
          message:
            "Erro ao cadastrar usuario, todos os campos devem ser fornecidos",
        },
        { status: 400 }
      );
    }
    const usuario = await Usuario.create(body);
    return NextResponse.json(usuario);
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao criar usuario!" },
      { status: 500 }
    );
  }
}
