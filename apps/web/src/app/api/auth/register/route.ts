import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { userRepository } from 'db/repositories/UserRepository';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input data
    const validatedData = registerSchema.parse(body);

    // Check for existing user
    const existingUser = await userRepository.findByEmail(validatedData.email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email address already exists' }, 
        { status: 400 }
      );
    }

    // Hash password using secure hashing with salt rounds of 12
    const passwordHash = await bcrypt.hash(validatedData.password, 12);

    // Create new user
    const newUser = await userRepository.create({
      name: validatedData.name,
      email: validatedData.email,
      password: passwordHash,
    });

    // Return success response with user data (excluding password hash)
    return NextResponse.json({ 
      message: 'Registration successful',
      user: { 
        id: newUser._id.toString(),
        name: newUser.name, 
        email: newUser.email,
        createdAt: newUser.createdAt
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      const fieldErrors = error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message
      }));
      
      return NextResponse.json({ 
        error: 'Invalid input data', 
        details: fieldErrors 
      }, { status: 400 });
    }

    // Handle MongoDB duplicate key errors
    if (error instanceof Error && error.message.includes('E11000')) {
      return NextResponse.json(
        { error: 'An account with this email address already exists' }, 
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { error: 'Registration failed. Please try again.' }, 
      { status: 500 }
    );
  }
}
