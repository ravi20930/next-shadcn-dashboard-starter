'use client';

import React, { useState } from 'react';
import { useViralPosts, ViralPost } from '@/services/viralPost.service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { useSaveToLibrary } from '@/services/quickPost.service';
import { useRegeneratePost } from '@/services/quickPost.service';
import PageContainer from '@/components/layout/page-container';
import { BookmarkIcon, SparklesIcon } from 'lucide-react';

const ViralList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const {
    data: viralPosts,
    isLoading,
    error
  } = useViralPosts(selectedCategory);
  const { mutate: savePost } = useSaveToLibrary();
  const { mutate: sparkPost } = useRegeneratePost();
  const { toast } = useToast();

  const handleSavePost = (postId: string) => {
    savePost(
      { postId },
      {
        onSuccess: () => {
          toast({ title: 'Post saved successfully' });
        },
        onError: () => {
          toast({ title: 'Failed to save post', variant: 'destructive' });
        }
      }
    );
  };

  const handleSparkPost = (postId: string) => {
    sparkPost(
      { postId },
      {
        onSuccess: (data) => {
          toast({ title: 'Post sparked successfully' });
          // Handle the updated post content here
        },
        onError: () => {
          toast({ title: 'Failed to spark post', variant: 'destructive' });
        }
      }
    );
  };

  if (isLoading)
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <Skeleton key={index} className="h-[300px] w-full" />
        ))}
      </div>
    );

  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <PageContainer scrollable={true}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-4 text-2xl font-bold">Viral Posts</h1>

        <div className="mb-6 flex flex-wrap gap-2">
          {/* @ts-ignore */}
          {viralPosts?.data.categories.map((category: string) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className="text-md cursor-pointer px-4 py-2"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="masonry-grid">
          {/* @ts-expect-error */}
          {viralPosts?.data.posts.map((post: ViralPost) => (
            <Card
              key={post._id}
              className="mb-4 break-inside-avoid overflow-hidden"
            >
              <CardHeader className="relative">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={post.authorProfilePic}
                      alt={post.author}
                    />
                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="break-words text-lg">
                      {post.author}
                    </CardTitle>
                    <p className="break-words text-sm text-gray-500">
                      @{post.authorHandle}
                    </p>
                  </div>
                </div>
                <div className="absolute right-2 top-2 flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleSavePost(post._id)}
                  >
                    <BookmarkIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleSparkPost(post._id)}
                  >
                    <SparklesIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{post.content}</p>
                <span className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default ViralList;
