'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  useTailoredPosts,
  useSeedIdeas,
  useSeedContent,
  useQuickPost
} from '@/services/post.service';
import useToastMessage from '@/hooks/useToastMessage';
import PageContainer from '../layout/page-container';
import TailoredPosts from './TailoredPosts';

const MadeForYouPage: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const showToast = useToastMessage();

  const [refreshType, setRefreshType] = useState<
    'default' | 'ideas' | 'content'
  >('default');

  const useTailoredMutation = useTailoredPosts();
  const { refetch: refetchSeedIdeas, isLoading: isLoadingIdeas } =
    useSeedIdeas();
  const { refetch: refetchSeedContent, isLoading: isLoadingContent } =
    useSeedContent();
  const useQuickPostMutation = useQuickPost();

  // useEffect(() => {
  //   useTailoredMutation.mutate();
  // }, []);

  const handleRefreshIdeas = async () => {
    try {
      await refetchSeedIdeas();
      showToast({
        title: 'Refresh successful',
        type: 'success'
      });
      setRefreshType('ideas');
      useTailoredMutation.mutate();
    } catch (error) {
      showToast({
        title: 'Refresh unsuccessful',
        type: 'error'
      });
    }
  };

  const handleRefreshContent = async () => {
    try {
      await refetchSeedContent();
      showToast({
        title: 'Refresh completed',
        type: 'success'
      });
      setRefreshType('content');
      useTailoredMutation.mutate();
    } catch (error) {
      showToast({
        title: 'Refresh unsuccessful',
        type: 'error'
      });
    }
  };

  const handleQuickPost = async (postContent: string) => {
    try {
      await useQuickPostMutation.mutateAsync({ content: postContent });
      showToast({
        title: 'Post saved to library successfully',
        type: 'success'
      });
    } catch (error) {
      showToast({
        title: 'Failed to save post to library',
        type: 'error'
      });
    }
  };

  return (
    <PageContainer scrollable={true}>
      <div className="container mx-auto p-4">
        <h1 className="mb-4 text-2xl font-bold">Made for You</h1>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Your Personalized Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex flex-col items-center lg:flex-row lg:justify-between">
              <span className="mb-2 text-xl font-semibold lg:mb-0">
                Personalized LinkedIn post and carousel ideas
              </span>
              <div className="flex space-x-4">
                <Button
                  onClick={handleRefreshIdeas}
                  disabled={isLoadingIdeas}
                  className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-800"
                >
                  {isLoadingIdeas ? 'Refreshing...' : 'Refresh Ideas'}
                </Button>
                <Button
                  onClick={handleRefreshContent}
                  disabled={isLoadingContent}
                  className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  {isLoadingContent ? 'Refreshing...' : 'Refresh Content'}
                </Button>
              </div>
            </div>

            <hr className="mb-3 mt-2" />

            <div className="made-for-you text-aria min-h-screen p-5 text-sm">
              <TailoredPosts
                refreshType={refreshType}
                posts={useTailoredMutation.data}
                isLoading={useTailoredMutation.isLoading}
                error={useTailoredMutation.error}
                onQuickPost={handleQuickPost}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default MadeForYouPage;
