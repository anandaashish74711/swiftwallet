import { NextResponse } from 'next/server';
import { prisma } from '@repo/db';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  console.log("Received request");

  try {
    const { email, password, phoneNumber } = await request.json();
    console.log("Request Body:", { email, password, phoneNumber });

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("User already exists");
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed");

    // Create user with wallet
    const newUser = await createUserWithWallet({
      phoneNumber,
      email,
      hashedpassword: hashedPassword,
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

async function createUserWithWallet(userData: { phoneNumber: string; email: string; hashedpassword: string }) {
  return await prisma.$transaction(async (tx) => {
    // Create the user
    const user = await tx.user.create({
      data: {
        phoneNumber: userData.phoneNumber,
        email: userData.email,
        hashedpassword: userData.hashedpassword,
      },
    });

    // Create the wallet
    await tx.wallet.create({
      data: {
        userId: user.id,
        balance: 1000, 
        currency: "INR", 
      },
    });

    return user;
  });
}
