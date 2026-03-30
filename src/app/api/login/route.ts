import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Stub validation (Accept any correctly formatted request)
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // In a real application, you would validate credentials against a database and generate a token
    console.log("Login attempt for:", email);

    return NextResponse.json(
      { 
        message: "Login successful",
        token: "stub-jwt-token-xyz123" 
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
