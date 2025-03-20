import { LoginForm } from '@/components/LoginForm';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>
            <LoginForm />
          </div>
        </div>
      </div>
      <div className='from-slate-50-500 relative hidden bg-muted bg-gradient-to-b lg:block'>
        <Image
          src='/placeholder.svg'
          alt='Image'
          className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}
