import { prisma } from '@/lib/prisma';
import { signupSchema } from '@/validations';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const result = signupSchema.safeParse(body);
		if (!result.success) {
			return NextResponse.json({ error: 'Invalid input', details: result.error.issues }, { status: 400 });
		}

		const { email, password, name } = result.data;

		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			return NextResponse.json({ error: 'User already exists' }, { status: 409 });
		}

		const hashedPassword = await hash(password, 12);

		const user = await prisma.user.create({
			data: {
				email,
				name,
				password: hashedPassword,
			},
			select: {
				id: true,
				email: true,
				name: true,
				profilePicture: true,
				createdAt: true,
			},
		});

		if (user) {
			return NextResponse.json(
				{
					message: 'User created successfully',
				},
				{ status: 201 }
			);
		} else {
			return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
		}
	} catch (error) {
		console.error('[SIGNUP_ERROR]', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
