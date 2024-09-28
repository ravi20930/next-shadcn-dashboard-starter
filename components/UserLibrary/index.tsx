'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useUserLibrary,
  useQuickPost,
  useUpdateLibraryPost
} from '@/services/post.service';
import { Button } from '@/components/ui/button';
import PostContent from './PostContent';
import { Loader } from 'lucide-react';
import useToastMessage from '@/hooks/useToastMessage';
import PageContainer from '../layout/page-container';
import {
  HeartIcon,
  HandThumbDownIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

interface Post {
  id: string;
  content: string;
  viralPostId: string;
  isSaved: boolean;
  isLiked: boolean;
  sparkedPost: string;
}

interface ApiResponse {
  statusCode: number;
  message: string;
  data: Post[];
}

type ActionType = 'delete' | 'like' | 'unlike';

const UserLibrary: React.FC = () => {
  const router = useRouter();
  const showToast = useToastMessage();

  const [expandedPosts, setExpandedPosts] = useState<{
    [key: string]: boolean;
  }>({});

  const { data: apiResponse, isLoading, error, refetch } = useUserLibrary();
  const quickPostMutation = useQuickPost();
  const updateLibraryPostMutation = useUpdateLibraryPost();

  const handleQuickPost = (sparkedPost: string) => {
    router.push(
      `/dashboard/CreateLinkedInPost?post=${encodeURIComponent(sparkedPost)}`
    );
  };

  const handleToggleExpand = (postId: string) => {
    setExpandedPosts((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId]
    }));
  };

  const handleUpdateClick = async (
    userLibId: string,
    actionType: ActionType
  ) => {
    try {
      await updateLibraryPostMutation.mutateAsync({
        action: actionType,
        userLibId
      });
      showToast({
        title: 'Post updated successfully',
        type: 'success'
      });
      refetch();
    } catch (error) {
      showToast({
        title: 'Failed to update post',
        type: 'error'
      });
    }
  };

  if (isLoading) return <Loader />;
  if (error)
    return <div>Error loading library: {(error as Error).message}</div>;

  // Ensure apiResponse.data is an array, or use an empty array as fallback
  const posts: Post[] = Array.isArray(apiResponse?.data)
    ? apiResponse.data
    : [];
  console.log('API Response:', apiResponse);
  console.log('Posts:', posts);

  return (
    <PageContainer scrollable={true}>
      <div className=" px-4 font-sans sm:px-6 lg:px-8">
        <div className="mb-2 flex flex-col items-center lg:flex-row lg:justify-between">
          <span className="mb-2 text-xl font-semibold lg:mb-0">
            User Library
          </span>
        </div>
        <hr className="mb-3 mt-2" />

        {/* {apiResponse && <p className="mb-4">{apiResponse.message}</p>} */}

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="relative rounded-md border border-gray-400 p-4"
              >
                <div className="mb-4">
                  <PostContent
                    content={
                      post.sparkedPost ||
                      post.content ||
                      'Default content or placeholder'
                    }
                    postId={post.id}
                  />
                </div>
                <div className="flex flex-row items-start justify-between space-x-4">
                  <div className="mb-4 flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleUpdateClick(post.id, 'delete')}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleUpdateClick(post.id, 'like')}
                    >
                      <HeartIcon className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleUpdateClick(post.id, 'unlike')}
                    >
                      <HandThumbDownIcon className="h-5 w-5" />
                    </Button>
                  </div>
                  <Button
                    onClick={() => handleQuickPost(post.sparkedPost)}
                    className="rounded-lg px-4 py-2 "
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No posts in your library.</p>
        )}
      </div>
    </PageContainer>
  );
};

export default UserLibrary;
