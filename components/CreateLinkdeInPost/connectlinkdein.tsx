'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useConnectLinkedIn } from '@/services/user.service';
import { useLinkedInLogin } from '@/services/auth.service';
import { useToast } from '@/components/ui/use-toast';

const ConnectLinkedIn: React.FC = () => {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const linkedInLoginMutation = useLinkedInLogin();
  const connectLinkedInMutation = useConnectLinkedIn();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      handleOAuthCallback(code);
    }
  }, [searchParams]);

  const handleOAuthCallback = async (code: string) => {
    try {
      const response = await linkedInLoginMutation.mutateAsync({ code });
      if (response.data.accessToken) {
        localStorage.setItem('linkedInAccessToken', response.data.accessToken);
        toast({
          title: 'LinkedIn Connected',
          description: 'Your LinkedIn account has been successfully connected.'
        });
      } else {
        throw new Error(response.data.message || 'Failed to connect LinkedIn');
      }
    } catch (error) {
      console.error('OAuth Error:', error);
      toast({
        title: 'Connection Failed',
        description: 'Failed to connect LinkedIn. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const initiateLinkedInConnect = async () => {
    try {
      const response = await connectLinkedInMutation.mutateAsync();
      if (response.data) {
        window.location.href = response.data;
      } else {
        throw new Error('Failed to get LinkedIn Auth URL');
      }
    } catch (error) {
      console.error('Error during LinkedIn connection:', error);
      toast({
        title: 'Connection Failed',
        description:
          'Failed to initiate LinkedIn connection. Please try again.',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="p-2">
      <Button
        onClick={initiateLinkedInConnect}
        disabled={
          connectLinkedInMutation.isLoading || linkedInLoginMutation.isLoading
        }
        className="border-stroke dark:border-dark-3 dark:bg-dark-2 flex w-full items-center justify-center gap-3.5 rounded-lg border bg-white p-[15px] font-medium text-gray-900 hover:bg-opacity-50 dark:hover:bg-opacity-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mr-2 text-blue-500"
        >
          <path d="M22.23 0H1.77C.792 0 0 .77 0 1.723v20.554C0 23.23.792 24 1.77 24h20.46c.978 0 1.77-.77 1.77-1.723V1.723C24 .77 23.208 0 22.23 0zM7.07 20.452H3.56V9.057h3.51v11.395zM5.315 7.691c-1.124 0-2.034-.897-2.034-2.002 0-1.105.91-2.002 2.034-2.002 1.124 0 2.034.897 2.034 2.002 0 1.105-.91 2.002-2.034 2.002zM20.454 20.452h-3.51v-5.56c0-1.327-.025-3.037-1.852-3.037-1.853 0-2.137 1.446-2.137 2.94v5.657h-3.51V9.057h3.37v1.553h.048c.469-.884 1.614-1.816 3.322-1.816 3.555 0 4.21 2.342 4.21 5.384v6.274z" />
        </svg>
        {connectLinkedInMutation.isLoading || linkedInLoginMutation.isLoading
          ? 'Connecting...'
          : 'Connect LinkedIn'}
      </Button>
    </div>
  );
};

export default ConnectLinkedIn;
