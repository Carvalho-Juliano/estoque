import { Usuario } from "@/model/Usuario";
import { createRequestSchemaUsuario } from "@/schemas/usuario/usuarioSchema";
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
    const parsedBody = createRequestSchemaUsuario.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          message: "Erro na validação dos dados",
          errors: parsedBody.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }
    const { email, senha } = parsedBody.data;
    const usuario = await Usuario.create({ email, senha });

    return NextResponse.json(usuario, { status: 201 });
  } catch (error: any) {
    if (error.message === "Email já cadastrado.") {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Erro ao criar usuário!" },
      { status: 500 }
    );
  }
}
