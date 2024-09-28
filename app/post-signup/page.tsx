// src/app/post-signup/page.tsx
'use client';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Loader } from 'lucide-react';
import { useAuth } from '@/hooks/authContext';

export default function PostSignupPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuth();

  useEffect(() => {
    const success = searchParams.get('success');
    const token = searchParams.get('token');

    if (success === 'true' && token) {
      login(token);
      toast({
        title: 'Success',
        description: 'You have successfully logged in.'
      });
      const redirectUrl = localStorage.getItem('redirectUrl') || '/dashboard';
      localStorage.removeItem('redirectUrl');
      router.push(redirectUrl);
    } else {
      toast({
        title: 'Error',
        description: 'Authentication failed. Please try again.',
        variant: 'destructive'
      });
      router.push('/login');
    }
  }, [searchParams, router, toast, login]);

  return (
    <div className="flex h-screen items-center justify-center">
      <Loader />
    </div>
  );
}
