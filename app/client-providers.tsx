'use client';

import React from 'react';

import { ReactQueryDevtools } from 'react-query/devtools';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from '@/components/ui/toaster';
import Providers from '@/components/layout/providers';

import { AuthProvider } from '@/hooks/authContext';

import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
interface ClientProvidersProps {
  children: React.ReactNode;
  session: any; // Replace 'any' with the correct type for your session
}

export default function ClientProviders({
  children,
  session
}: ClientProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Providers session={session}>
          <NextTopLoader showSpinner={false} />
          <Toaster />
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </Providers>
      </AuthProvider>
    </QueryClientProvider>
  );
}
