'use server';
import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';

type LoginData = {
  email: string;
  password: string;
};

const prisma = new PrismaClient();

export async function signUpUser({ email, password }: LoginData) {
  console.log('🚀 ~ addUserAction ~ :', { email, password });
  // const salt = bcrypt.genSaltSync(10);
  const passwordHash1 = bcrypt.hashSync(password, 10);

  try {
    const resUser = await prisma.user.create({
      data: {
        email,
        passwordHash: passwordHash1,
      },
    });
    console.log('🚀 ~ addUserAction ~ user:', resUser);
    const { passwordHash, ...user } = resUser;
    return { ok: true, user };
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.cause, err.message, err.name, err.stack);
      return { ok: false, errMsg: err.message, errName: err.name };
    }
  }
}
