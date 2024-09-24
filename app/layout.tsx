// app/layout.tsx
import { Inter } from 'next/font/google';
import { auth } from '@/auth';
import ClientProviders from './client-providers';
import './globals.css';
import '@uploadthing/react/styles.css';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${inter.className} overflow-hidden`}
        suppressHydrationWarning={true}
      >
        <ClientProviders session={session}>{children}</ClientProviders>
      </body>
    </html>
  );
}
