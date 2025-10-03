import { handleError } from "@/errors/HandleError";
import { User } from "@/model/Usuario";
import { userService } from "@/services/userService";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await User.findAll();
    return NextResponse.json(users);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const registerNewUser = await userService.create(body);
    return NextResponse.json(registerNewUser, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
