import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    await prisma.message.create({
      data: {
        name: body.name,
        email: body.email,
        company: body.company,
        phone: body.phone,
        content: body.content,
      }
    });

    return NextResponse.json(
      { message: "Thank you for reaching out. A representative will contact you shortly." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request. Failed to save message." },
      { status: 400 }
    );
  }
}
