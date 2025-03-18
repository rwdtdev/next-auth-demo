import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  //   return NextResponse.redirect(new URL('/home', request.url))

  const token = await getToken({ req }); // request не подходит, только req ))
  console.log('🚀 ~ middleware ~ token:', token);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/login',
};
