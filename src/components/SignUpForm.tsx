'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEvent } from 'react';
import { signUpUser } from '@/app/actions/users';

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'>) {
  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      {...props}
      onSubmit={async (e: FormEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          email: { value: string };
          password: { value: string };
        };
        console.log(target.email.value, target.password.value);
        const resSignIn = await signUpUser({
          email: target.email.value,
          password: target.password.value,
        });

        console.log(resSignIn);
      }}
    >
      <div className='flex flex-col items-center gap-2 text-center'>
        <h1 className='text-2xl font-bold'>Create account</h1>
        <p className='text-balance text-sm text-muted-foreground'>
          Enter your email and make up password below to create account
        </p>
      </div>
      <div className='grid gap-6'>
        <div className='grid gap-2'>
          <Label htmlFor='email'>email</Label>
          <Input id='email' type='email' placeholder='m@example.com' required />
        </div>
        <div className='grid gap-2'>
          <div className='flex items-center'>
            <Label htmlFor='password'>Password</Label>
          </div>
          <Input id='password' type='password' required />
        </div>
        <Button type='submit' className='w-full'>
          SignUp
        </Button>
      </div>
    </form>
  );
}
