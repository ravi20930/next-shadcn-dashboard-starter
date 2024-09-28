'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuickPost, useGetUserData } from '@/services/common.service';
import {
  useSaveToLibrary,
  useRegeneratePost
} from '@/services/quickPost.service';
import PageContainer from '@/components/layout/page-container';
import { RecentSales } from '@/components/recent-sales';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster } from '@/components/ui/toaster';
import useToastMessage from '@/hooks/useToastMessage';
import { Editor } from '@tinymce/tinymce-react';
import { useRecentPosts } from '@/services/post.service';
import { useProtectedRoute } from '@/hooks/useProtectedRoutes';
const CreatePost: React.FC = () => {
  const [postContent, setPostContent] = useState<string>('');
  const maxCharacters = 3000;

  const searchParams = useSearchParams();
  const { data: userData, isLoading: isUserDataLoading } = useGetUserData();
  const { mutate: quickPost, isLoading: isQuickPostLoading } = useQuickPost();
  const { mutate: saveToLibrary } = useSaveToLibrary();
  const { mutate: sparkPost } = useRegeneratePost();
  const toast = useToastMessage();
  const isAuthenticated = useProtectedRoute();
  const { data: recentPosts, isLoading: isRecentPostsLoading } =
    useRecentPosts();

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

  const handleEditorChange = (content: string) => {
    setPostContent(content);
  };

  const handleQuickPost = () => {
    quickPost(
      { content: postContent },
      {
        onSuccess: (data) => {
          toast({
            type: 'success',
            title: 'Success!',
            description: `Successfully posted on LinkedIn! Check it out here: ${data.data}`
          });
          setPostContent('');
        },
        onError: (error) => {
          toast({
            title: 'Error',
            description: 'Failed to post content. Please try again.',
            type: 'success'
          });
          console.error('Error posting content:', error);
        }
      }
    );
  };

  const handleSaveToLibrary = () => {
    saveToLibrary(
      { content: postContent },
      {
        onSuccess: () => {
          toast({
            title: 'Saved!',
            description: 'Your post has been saved to your library.'
          });
        },
        onError: () => {
          toast({
            title: 'Error',
            description: 'Failed to save post. Please try again.',
            type: 'destructive'
          });
        }
      }
    );
  };

  // const handleSparkPost = () => {
  //   sparkPost(
  //     { content: postContent },
  //     {
  //       onSuccess: (data) => {
  //         setPostContent(data.content);
  //         toast({
  //           title: 'Post Enhanced!',
  //           description: 'Your post has been improved with AI assistance.'
  //         });
  //       },
  //       onError: () => {
  //         toast({
  //           title: 'Error',
  //           description: 'Failed to enhance post. Please try again.',
  //           variant: 'destructive'
  //         });
  //       }
  //     }
  //   );
  // };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Create a Post</h2>
          <div className="hidden items-center space-x-2 md:flex">
            <Button onClick={handleSaveToLibrary} variant="outline">
              Save to Library
            </Button>
            <Button onClick={handleQuickPost} disabled={isQuickPostLoading}>
              {isQuickPostLoading ? 'Posting...' : 'Post to LinkedIn'}
            </Button>

            {/* <Button onClick={handleSparkPost} variant="secondary">
              Enhance with AI
            </Button> */}
          </div>
        </div>
        <Tabs defaultValue="editor" className="space-y-4">
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="editor" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Create Your Post</CardTitle>
                <CardDescription>
                  Write your LinkedIn post content here. Maximum {maxCharacters}{' '}
                  characters.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Editor
                  apiKey="bcl8x9xyfpjbvq5021iyigdg4qoc4so8ep8e50397lhq9gjy"
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                      'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
                  }}
                  value={postContent}
                  onEditorChange={handleEditorChange}
                />
                <div className="mt-2 text-sm text-muted-foreground">
                  {postContent && postContent.length} / {maxCharacters}{' '}
                  characters
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>
                  This is how your post will look on LinkedIn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: postContent }}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        {/* <Card>
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
            <CardDescription>Your recent LinkedIn posts</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card> */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
            <CardDescription>Your recent LinkedIn posts</CardDescription>
          </CardHeader>
          <CardContent>
            {isRecentPostsLoading ? (
              <p>Loading recent posts...</p>
            ) : recentPosts &&
              Array.isArray(recentPosts) &&
              recentPosts.length > 0 ? (
              <ul className="space-y-4">
                {recentPosts.map((post: any, index: number) => (
                  <li key={index} className="border-b pb-4">
                    <p className="font-semibold">
                      Posted on: {new Date(post.createdAt).toLocaleString()}
                    </p>
                    <p className="mt-2">{post.content.substring(0, 100)}...</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recent posts found.</p>
            )}
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </PageContainer>
  );
};

export default CreatePost;
