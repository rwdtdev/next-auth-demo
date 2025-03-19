import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/authOptions';
import { SignOutBtn } from '@/components/SignOutBtn';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  console.log('🚀 ~ HomePage ~ session:', session);
  return (
    <>
      <h2>Home Page</h2>
      <div>name: {session?.user?.name}</div>
      <div>email: {session?.user?.email}</div>
      <SignOutBtn />
    </>
  );
}
