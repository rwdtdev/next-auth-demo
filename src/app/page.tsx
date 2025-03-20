import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/authOptions';
import { SignOutBtn } from '@/components/SignOutBtn';
import Image from 'next/image';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  console.log('🚀 ~ HomePage ~ session:', session);
  return (
    <main className='flex h-dvh w-full'>
      <div className='m-auto space-y-3 rounded-md border p-5 shadow-lg'>
        <h2 className='font-bold'>Welcome!</h2>
        {session?.user?.name && (
          <div>
            <span className='font-semibold'>name: </span>
            {session.user.name}
          </div>
        )}
        <div>
          <span className='font-semibold'>email: </span>
          {session?.user?.email}
        </div>
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
      </div>
    </main>
  );
}
