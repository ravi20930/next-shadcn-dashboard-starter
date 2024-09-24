import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PageContainer({
  children,
  scrollable = false
}: {
  children: React.ReactNode;
  scrollable?: boolean;
}) {
  return (
    <div className="h-[calc(100dvh-52px)] w-full">
      {scrollable ? (
        <ScrollArea className="h-full w-full">
          <div className="w-full p-4 md:px-8">{children}</div>
        </ScrollArea>
      ) : (
        <div className="h-full overflow-hidden p-4 md:px-8">{children}</div>
      )}
    </div>
  );
}
