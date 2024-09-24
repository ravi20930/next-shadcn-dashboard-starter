// app/client-providers.tsx
'use client';

import React from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from '@/components/ui/toaster';
import Providers from '@/components/layout/providers';
import { queryClient } from '@/utils/useQueryClient';

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
      <NextTopLoader showSpinner={false} />
      <Providers session={session}>
        <Toaster />
        {children}
      </Providers>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
