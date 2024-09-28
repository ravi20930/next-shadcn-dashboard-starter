'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useGoogleAuth, useLinkedInAuth } from '@/services/auth.service';
import { useToast } from '@/components/ui/use-toast';
import ClientProviders from '@/app/client-providers';
import { useAuth } from '@/hooks/authContext';
import LogoFull from '@/public/static/images/logoFull.png';

export default function AuthenticationPage() {
  const router = useRouter();
  const { toast } = useToast();
  const googleAuth = useGoogleAuth();
  const linkedInAuth = useLinkedInAuth();

  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      const redirectUrl = localStorage.getItem('redirectUrl') || '/dashboard';
      localStorage.removeItem('redirectUrl');
      router.push(redirectUrl);
    }
  }, [isAuthenticated, router]);

  const handleGoogleLogin = async () => {
    try {
      const response = await googleAuth.mutateAsync(null);
      //@ts-ignore
      if (response.data && response.data.data) {
        //@ts-ignore
        window.location.href = response.data.data;
      } else {
        throw new Error('Invalid response from Google auth');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to initiate Google login. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const handleLinkedInLogin = async () => {
    try {
      const response = await linkedInAuth.mutateAsync(null);
      //@ts-ignore
      if (response.data && response.data.data) {
        //@ts-ignore
        window.location.href = response.data.data;
      } else {
        throw new Error('Invalid response from LinkedIn auth');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to initiate LinkedIn login. Please try again.',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <Link href={'https://app.sparklin.ai/'} target="_blank">
          <img src={LogoFull.src} width={170} height={100} />
        </Link>
        <div className="relative z-20 mt-auto"></div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign up with your social media account
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Social Login</CardTitle>
              <CardDescription>
                Choose your preferred social media platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <button
                onClick={handleGoogleLogin}
                className="inline-flex h-10 w-full items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Sign in with Google
              </button>
              <button
                onClick={handleLinkedInLogin}
                className="inline-flex h-10 w-full items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Sign in with LinkedIn
              </button>
            </CardContent>
          </Card>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
