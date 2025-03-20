import { PrismaClient } from '@prisma/client';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import GithubProvider from 'next-auth/providers/github';

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error('GITHUB_ID and GITHUB_SECRET must be define');
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  providers: [
    // in https://github.com/settings/developers add Apps, Authorization callback URL set url to home page (http://localhost:3000)
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      // id: "credentials",
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, email, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials /* , req */) {
        if (!credentials) return null;
        const prisma = new PrismaClient();
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.email,
            },
          });
          if (!user) {
            return null;
          } else {
            const isPasswordCorrect = bcrypt.compareSync(
              credentials.password,
              user.passwordHash!
            );
            if (!isPasswordCorrect) {
              return null;
            } else {
              return _.omit(user);
              // return user;
            }
          }
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    }),
  ],
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30,
    // You can define your own encode/decode functions for signing and encryption
    // async encode() {},
    // async decode() {},
  },
  callbacks: {
    async jwt({ token, user, account, profile, trigger }) {
      console.log('🚀 ~ jwt ~ trigger:', trigger);
      console.log('🚀 ~ jwt ~ token:', token);
      console.log('🚀 ~ jwt ~ profile:', profile);
      console.log('🚀 ~ jwt ~ account:', account);
      console.log('🚀 ~ jwt ~ user:', user);
      if (user) {
        token.name = user.email;

        console.log('🚀 ~ jwt ~ tokenWithemail:', token);
      }
      return token;
    },
    // async session({ session, token, user }) {
    //   console.log("🚀 ~ session ~ user:", user);
    //   console.log("🚀 ~ session ~ token:", token);
    //   console.log("🚀 ~ session ~ session:", session);

    //   return session;
    // },
  },
};
