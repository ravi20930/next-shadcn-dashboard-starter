'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetUser } from '@/services/user.service';
import { useQuickPost } from '@/services/post.service';
import FileUploadComponent from './FileUploadDocument';
import { Button } from '@/components/ui/button';
import useToastMessage from '@/hooks/useToastMessage';
import { Loader } from 'lucide-react';
import ConnectLinkedIn from './connectlinkdein';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface UserData {
  id: string;
  googleId: string;
  name: string;
  picture: string;
  username: string | null;
  linConnected: boolean;
  aiCredits: number;
  isActive: boolean;
  trialExpiryDate: string;
}

const QuickPost: React.FC = () => {
  const [postContent, setPostContent] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const showToast = useToastMessage();
  const maxCharacters = 3000;

  const {
    data: userResponse,
    isLoading: isUserLoading,
    error: userError
  } = useGetUser();
  const quickPostMutation = useQuickPost();

  const userData: UserData | undefined = userResponse?.data;
  console.log('userdata', userData);
  const isLinkedInConnected = userData?.linConnected ?? false;

  useEffect(() => {
    const post = searchParams.get('post');
    if (post) {
      try {
        setPostContent(decodeURIComponent(post));
      } catch (error) {
        console.error('Error decoding URI:', error);
        setPostContent(post);
      }
    }
  }, [searchParams]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  const handleQuickPost = async () => {
    if (!postContent.trim()) {
      showToast({ title: 'Post content cannot be empty', type: 'error' });
      return;
    }

    try {
      await quickPostMutation.mutateAsync({ content: postContent });
      showToast({
        title: 'Post saved to library successfully',
        type: 'success'
      });
    } catch (error) {
      showToast({ title: 'Failed to save post', type: 'error' });
    }
  };

  const openConfirmationModal = () => setIsModalOpen(true);

  if (isUserLoading) return <Loader />;
  if (userError) return <div>Error loading user data: {userError.message}</div>;

  return (
    <div>
      <div className="mb-2 flex flex-col items-center lg:flex-row lg:justify-between">
        <span className="mb-2 text-xl font-semibold lg:mb-0">Post Content</span>
        {userData && (
          <div className="text-sm text-gray-600">
            Welcome, {userData.name} | AI Credits: {userData.aiCredits}
          </div>
        )}
      </div>
      <hr className="mb-3 mt-2" />
      <div className="min-h-screen w-full  px-4 py-8 font-sans text-black sm:px-6 lg:px-8">
        <div className="animate-slideInFromRight mx-auto max-w-3xl rounded border  border-gray-300 p-6">
          <textarea
            value={postContent}
            onChange={handleContentChange}
            placeholder="Write your post here..."
            className="w-full rounded-md border border-gray-300 p-3 transition-colors focus:border-primary focus:ring-0"
            rows={10}
            style={{ resize: 'vertical' }}
            maxLength={maxCharacters}
          />

          <div className="mt-2 text-gray-600">
            {postContent.length} / {maxCharacters}
          </div>

          <div className="mt-6 flex items-start justify-between">
            <div>
              <FileUploadComponent />
            </div>

            <div className="flex flex-col items-end space-y-4">
              <Button
                onClick={openConfirmationModal}
                className="flex items-center rounded bg-blue-500 px-4 py-2 text-white"
                disabled={!isLinkedInConnected}
              >
                <FontAwesomeIcon icon={faStar} className="mr-2" />
                Post on LinkedIn
              </Button>

              {!isLinkedInConnected && <ConnectLinkedIn />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickPost;
