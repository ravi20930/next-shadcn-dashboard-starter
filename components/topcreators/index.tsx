'use client';

import React, { useState, useEffect } from 'react';
import Virals from './viralpage';
// import SearchForm from "@/components/SearchForm";
import { Loader } from 'lucide-react';
import useToastMessage from '@/hooks/useToastMessage';
import {
  useInspiration,
  useSaveToUserLibrary,
  useSparkPost
} from '@/services/post.service';
import PageContainer from '../layout/page-container';

const Creators: React.FC = () => {
  const [author, setAuthor] = useState('');
  const [size, setSize] = useState(40);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const showToast = useToastMessage();

  const {
    data: inspirationData,
    isLoading: isLoadingInspiration,
    error: inspirationError
  } = useInspiration();
  console.log('inspiration ', inspirationData);

  const saveToLibraryMutation = useSaveToUserLibrary();
  const sparkPostMutation = useSparkPost();

  // Handle search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1); // Reset to the first page on a new search
  };

  // Handle save to library
  const handleSaveToLibrary = async (postId: string) => {
    try {
      await saveToLibraryMutation.mutateAsync({ postId });
      showToast({ title: 'Failed to regenerate post', type: 'success' });
      // Show success message or update UI
    } catch (error) {
      // Handle error
      console.error('Error saving to library:', error);
    }
  };

  // Handle spark post
  const handleSparkPost = async (postId: string) => {
    try {
      await sparkPostMutation.mutateAsync({ postId });

      // Show success message or update UI
    } catch (error) {
      // Handle error
      console.error('Error sparking post:', error);
    }
  };

  // Load more posts
  const loadMorePosts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <PageContainer scrollable={true}>
      <div className="mb-2 flex flex-col items-center lg:flex-row lg:justify-between">
        <span className="mb-2 text-xl font-bold lg:mb-0">Top Creators</span>
      </div>
      <hr className="mb-3 mt-2" />
      <div className="  font-aria text-sm">
        {isLoadingInspiration && <Loader />}
        {inspirationError ? (
          <p>Error loading inspiration: {inspirationError.message}</p>
        ) : (
          inspirationData && (
            <Virals
              author={author}
              size={size}
              page={page}
              searchQuery={searchQuery}
              posts={inspirationData}
              onSaveToLibrary={handleSaveToLibrary}
              onSparkPost={handleSparkPost}
            />
          )
        )}
      </div>
    </PageContainer>
  );
};

export default Creators;
