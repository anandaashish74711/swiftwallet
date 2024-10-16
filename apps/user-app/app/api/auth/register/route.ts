import { NextResponse } from 'next/server';
import { prisma } from '@repo/db';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  console.log("Received request");

  try {
    const { email, password, phoneNumber } = await request.json();
    console.log("Request Body:", { email, password, phoneNumber });

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("User already exists");
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed");

    const newUser = await prisma.user.create({
      data: {
        email,
        phoneNumber,
        hashedpassword: hashedPassword, // Ensure this matches the schema exactly
      },
    });
    

    console.log("User created:", newUser);
    return NextResponse.json(
      { message: 'User registered successfully', user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
