'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { GithubIcon } from './icons/GithubIcon';

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'>) {
  const router = useRouter();
  return (
    <>
      <form
        className={cn('flex flex-col gap-6', className)}
        {...props}
        onSubmit={async (e: React.SyntheticEvent) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
          };

          console.log(target.email.value, target.password.value);
          const resSignIn = await signIn('credentials', {
            redirect: false,
            email: target.email.value,
            password: target.password.value,
          });

          console.log(resSignIn);
          if (resSignIn?.ok) {
            router.push('/');
          }
        }}
      >
        <div className='flex flex-col items-center gap-2 text-center'>
          <h1 className='text-2xl font-bold'>Login to your account</h1>
          <p className='text-balance text-sm text-muted-foreground'>
            Enter your email below to login to your account
          </p>
        </div>
        <div className='grid gap-6'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>email</Label>
            <Input
              id='email'
              type='email'
              placeholder='m@example.com'
              required
            />
          </div>
          <div className='grid gap-2'>
            <div className='flex items-center'>
              <Label htmlFor='password'>Password</Label>
              <a
                href='#'
                className='ml-auto text-sm underline-offset-4 hover:underline'
              >
                Forgot your password?
              </a>
            </div>
            <Input id='password' type='password' required />
          </div>
          <Button type='submit' className='w-full'>
            Login
          </Button>
        </div>
      </form>
      <div className='relative my-3 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
        <span className='relative z-10 bg-background px-2 text-muted-foreground'>
          Or continue with
        </span>
      </div>
      <Button
        variant='outline'
        className='w-full'
        onClick={() => {
          signIn('github');
        }}
      >
        <GithubIcon />
        Login with GitHub
      </Button>
      <div className='text-center text-sm my-3'>
        Don&apos;t have an account?{' '}
        <a href='/signup' className='underline underline-offset-4'>
          Sign up
        </a>
      </div>
    </>
  );
}
