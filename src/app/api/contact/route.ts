import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real application, you would send an email or save to a database here
    console.log("Contact form payload:", body);

    return NextResponse.json(
      { message: "Thank you for reaching out. A representative will contact you shortly." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
