import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/authOptions';
import { SignOutBtn } from '@/components/SignOutBtn';
import Image from 'next/image';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  console.log('🚀 ~ HomePage ~ session:', session);
  return (
    <>
      <h2>Home Page</h2>
      {session?.user?.name && <div>name: {session.user.name}</div>}
      <div>email: {session?.user?.email}</div>
      {session?.user?.image && (
        <Image
          src={session.user.image}
          width={200}
          height={200}
          priority={false}
          alt='logo'
        />
      )}
      <SignOutBtn />
    </>
  );
}
