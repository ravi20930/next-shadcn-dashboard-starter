'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { X } from 'lucide-react';

interface SaveToLibraryProps {
  content: string;
}

const SaveToLibrary: React.FC<SaveToLibraryProps> = ({ content }) => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  const handleCreatePost = async () => {
    setLoading(true);
    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setNotification({ type: 'success', message: 'Post saved successfully!' });
    } catch (error) {
      console.error('Error creating post:', error);
      setNotification({ type: 'error', message: 'Failed to save post.' });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <Card className="mt-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Save to Library</CardTitle>
        <Button variant="ghost" size="icon" onClick={handleClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <CardDescription>
          Do you want to save this post to your user library?
        </CardDescription>
        <Button
          className="mt-4 w-full"
          onClick={handleCreatePost}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save to Library'}
        </Button>
        {notification && (
          <Alert
            className="mt-4"
            variant={
              notification.type === 'success' ? 'default' : 'destructive'
            }
          >
            <AlertTitle>
              {notification.type === 'success' ? 'Success' : 'Error'}
            </AlertTitle>
            <AlertDescription>{notification.message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default SaveToLibrary;
