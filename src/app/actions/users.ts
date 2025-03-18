'use server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

type LoginData = {
  email: string;
  password: string;
};

const prisma = new PrismaClient();

export async function signUpUser({ email, password }: LoginData) {
  console.log('🚀 ~ addUserAction ~ :', { email, password });
  // const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
      },
    });
    console.log('🚀 ~ addUserAction ~ user:', user);
  } catch (err) {
    console.error(err);
  }
}
