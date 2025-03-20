import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/authOptions';
import { UserCard } from '@/components/UserCard';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  return (
    <main className='flex h-dvh w-full overflow-hidden'>
      <UserCard session={session!} />
    </main>
  );
}
