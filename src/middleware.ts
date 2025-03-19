import { getToken } from 'next-auth/jwt';
import { NextResponse, type NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  // request не подходит, только req для дальнейшего использования в getToken({req}),  getToken({request}) выдает ошибку
  console.log('🚀 ~ middleware ~ req:', req.nextUrl.pathname, req.url);
  const isLoginPage = req.nextUrl.pathname === '/login';
  const isSignUpPage = req.nextUrl.pathname === '/signup';

  const token = await getToken({ req }); // request не подходит, только req,  getToken({request}) выдает ошибку
  console.log(
    '🚀 ~ middleware ~ token, pathname, url',
    token,
    req.nextUrl.pathname,
    req.url
  );

  if (!token && !isLoginPage && !isSignUpPage) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token && isLoginPage) {
    console.log(new URL('/', req.url));
    return NextResponse.redirect(new URL('/', req.url));
  }
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/login', '/signup'],
};
