'use client';

import React, { useState } from 'react';
import { Loader } from 'lucide-react';
import useToastMessage from '@/hooks/useToastMessage';
import {
  useViralsByCategory,
  useSaveToUserLibrary,
  useSparkPost
} from '@/services/post.service';
import { Button } from '@/components/ui/button';
import { UserIcon } from '@heroicons/react/24/solid';
import { BoltIcon } from '@heroicons/react/24/outline';
import renderPostContent from '../madeForYou/renderPostContent';
import { ScrollArea } from '@/components/ui/scroll-area';

import PageContainer from '../layout/page-container';
// import Modal from "./Modal";

interface ViralPost {
  _id: string;
  author: string;
  authorHandle: string;
  authorProfilePic: string;
  date: string;
  content: string;
  likes: number;
  linkedInUrl: string;
  localProfilePicPath: string;
  category: string;
  isLiked: boolean;
  isSaved: boolean;
  isSparked: boolean;
}

interface ViralData {
  categories: string[];
  posts: ViralPost[];
}

const Virals: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedPosts, setExpandedPosts] = useState<{
    [key: string]: boolean;
  }>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedFeel, setSelectedFeel] = useState<string>('Formal');

  const showToast = useToastMessage();

  const {
    data: viralData,
    isLoading,
    error
  } = useViralsByCategory(selectedCategory);
  const saveToLibraryMutation = useSaveToUserLibrary();
  const sparkPostMutation = useSparkPost();

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleToggleExpand = (postId: string) => {
    setExpandedPosts((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId]
    }));
  };

  const handleSaveToLibrary = async (postId: string) => {
    try {
      await saveToLibraryMutation.mutateAsync({ postId });
      showToast({
        title: 'Post saved to library successfully',
        type: 'success'
      });
    } catch (error) {
      showToast({ title: 'Failed to save post to library', type: 'error' });
    }
  };

  const handleSparkPost = async () => {
    if (!selectedPostId) return;
    try {
      await sparkPostMutation.mutateAsync({
        viralPostId: selectedPostId,
        feel: selectedFeel
      });
      showToast({ title: 'Post sparked successfully', type: 'success' });
      setShowModal(false);
    } catch (error) {
      showToast({ title: 'Failed to spark post', type: 'error' });
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading viral posts: {error.message}</p>;

  const data: ViralData | undefined = viralData?.data;
  const categories: string[] = data?.categories || [];
  const posts: ViralPost[] = data?.posts || [];

  return (
    <PageContainer
      scrollable={true}
      className=" font-aria min-h-screen text-sm text-gray-800"
    >
      <h1 className="mb-4 text-2xl font-bold">Inspiration Virals</h1>

      <div className="mb-6 flex flex-wrap justify-center gap-2">
        <Button
          className={`rounded-xl border border-gray-400 px-2 ${
            selectedCategory === 'all' ? 'bg-gray-200' : 'border-black'
          } transition-colors duration-200 hover:bg-gray-100`}
          onClick={() => handleCategoryChange('all')}
        >
          All
        </Button>
        {categories.map((category, index) => (
          <Button
            key={index}
            className={`rounded-xl border border-gray-400 px-2 ${
              selectedCategory === category ? 'bg-gray-200' : 'border-black'
            } transition-colors duration-200 hover:bg-gray-100`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="animate-swipeUp mx-auto grid max-w-6xl grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post._id}
            className="mb-3 rounded-lg border border-gray-400 p-4 transition-transform duration-300 ease-in-out hover:scale-100 hover:transform"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {post.authorProfilePic !== 'NA' ? (
                  <img
                    src={post.authorProfilePic}
                    alt={`${post.author} profile`}
                    className="h-12 w-12 rounded-full"
                  />
                ) : (
                  <UserIcon className="h-12 w-12 rounded-full border text-gray-500" />
                )}
                {/* <div>
                  <p className="font-semibold">{post.author}</p>
                  <p className="text-gray-500">{post.authorHandle !== "NA" ? post.authorHandle : ""}</p>
                </div> */}
              </div>
              <div className="flex items-center space-x-2">
                <a
                  href={post.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600"
                >
                  <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                  >
                    <path
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <button
                  onClick={() => handleSaveToLibrary(post._id)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  {post.isSaved ? 'Saved' : 'Save'}
                </button>
                <button
                  onClick={() => {
                    setSelectedPostId(post._id);
                    setShowModal(true);
                  }}
                  className="text-blue-500 hover:text-blue-600"
                >
                  {post.isSparked ? (
                    <img
                      src="/Images/user/thunder.png"
                      alt="Sparked Icon"
                      className="h-6 w-6"
                    />
                  ) : (
                    <BoltIcon className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
            <hr className="mb-4" />
            <div
              className={`mb-2 mt-2 p-4 transition-transform duration-300 ${
                post.isSparked
                  ? 'line-blur scale-105 transform grayscale'
                  : 'scale-100 transform'
              }`}
            >
              {renderPostContent(
                post.content,
                post._id,
                expandedPosts,
                handleToggleExpand
              )}
            </div>
            <div className="mb-4 flex items-center justify-between">
              <p>
                <span className="mr-1">👍</span>
                {post.likes}
              </p>
              <p className="ml-4 text-sm text-gray-400">{post.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* <Modal
        showModal={showModal}
        handleCloseModal={() => setShowModal(false)}
        handleSpark={handleSparkPost}
        selectedFeel={selectedFeel}
        setSelectedFeel={setSelectedFeel}
      /> */}
    </PageContainer>
  );
};

export default Virals;
