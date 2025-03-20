'use client';
import { Session } from 'next-auth';
import { SignOutBtn } from './SignOutBtn';
import Image from 'next/image';

type Props = {
  session: Session;
};

export function UserCard({ session }: Props) {
  return (
    <div className='animate-scale1 relative m-auto space-y-3 rounded-md border p-5 shadow-lg'>
      <h2 className='text-2xl font-bold'>Welcome!</h2>
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
  );
}
