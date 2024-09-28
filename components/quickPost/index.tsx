'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Edit, EditIcon, Library, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReactMarkdown from 'react-markdown';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Loader } from 'lucide-react';
import {
  useGetTopics,
  useGetContent,
  useSaveToLibrary,
  useRegeneratePost
} from '@/services/quickPost.service';
import useToastMessage from '@/hooks/useToastMessage';
import PageContainer from '../layout/page-container';

const CreateLinkedInPost: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [isTopicValid, setIsTopicValid] = useState(true);
  const [count] = useState(5);
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [generatedPost, setGeneratedPost] = useState('');
  const [editableSelectedIdea, setEditableSelectedIdea] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  const router = useRouter();
  const showToast = useToastMessage();
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedFeel, setSelectedFeel] = useState<string>('');
  const feels = [
    'humorous',
    'formal',
    'emoji',
    'serious',
    'curious',
    'friendly'
  ];

  useEffect(() => {
    setIsLoaded(true);
  });
  const [selectedSize, setSelectedSize] = useState<string>('');
  const sizes = ['small', 'medium', 'large', 'humongous'];
  const sizeDescriptions = {
    small: 'A concise post with around 50-100 words.',
    medium: 'A balanced post with approximately 100-200 words.',
    large: 'A detailed post containing 200-400 words.',
    humongous: 'An in-depth post with over 400 words.'
  };

  const getTopicsMutation = useGetTopics();
  const getContentMutation = useGetContent();
  const saveToLibraryMutation = useSaveToLibrary();
  const regeneratePostMutation = useRegeneratePost();

  const handleGenerateTopics = async () => {
    let valid = topic.trim() !== '';
    setIsTopicValid(valid);

    if (valid) {
      try {
        console.log('we are trying');
        const response = await getTopicsMutation.mutateAsync({
          field: topic,
          count
        });
        console.log('response', response);
        //@ts-ignore
        setTopics(response.data.data!);
      } catch (error) {
        console.error('Error fetching topics:', error);
        setTopics([]);
        showToast({ title: 'Failed to generate topics', type: 'error' });
      }
    }
  };

  const handleSelectTopic = async (selectedTopic: string) => {
    setSelectedTopic(selectedTopic);
    setEditableSelectedIdea(selectedTopic);

    try {
      const response = await getContentMutation.mutateAsync({
        topic: selectedTopic
      });
      //@ts-ignore
      setGeneratedPost(response.data.data);
    } catch (error) {
      console.error('Error generating post:', error);
      setGeneratedPost('An error occurred while generating the post.');
      showToast({ title: 'Failed to generate post', type: 'error' });
    }
  };

  const handleSaveToLibrary = async () => {
    try {
      await saveToLibraryMutation.mutateAsync({ content: generatedPost });
      showToast({
        title: 'Post saved to library successfully',
        type: 'success'
      });
    } catch (error) {
      console.error('Error saving to library:', error);
      showToast({ title: 'Failed to save post to library', type: 'error' });
    }
  };

  const handleRegeneratePost = async () => {
    if (!selectedFeel) {
      showToast({ title: 'Please select a feel', type: 'error' });
      return;
    }

    try {
      const response = await regeneratePostMutation.mutateAsync({
        feel: selectedFeel,
        content: generatedPost,
        userPrompt: userPrompt,
        size: 'medium',
        additionalParams: {
          initialUserInput: topic,
          aiGeneratedtopic: selectedTopic
        }
      });
      //@ts-ignore
      setGeneratedPost(response.data.data);
    } catch (error) {
      console.error('Error regenerating post:', error);
      showToast({ title: 'Failed to regenerate post', type: 'error' });
    }
  };

  const handleProceed = () => {
    router.push(
      `/dashboard/create-post?post=${encodeURIComponent(generatedPost)}`
    );
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return null;
  }

  if (!isLoaded) {
    return null;
  }

  return (
    <PageContainer scrollable={true}>
      <div className="mb-4 flex h-full w-full flex-col space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">
          Create LinkedIn Post
        </h2>
        <div className="flex max-h-full w-full grow flex-row gap-x-4">
          <div className="flex h-full basis-1/3 flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Generate Topics</CardTitle>
                <CardDescription>
                  Enter a topic to generate LinkedIn post ideas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Enter topic here (8-10 words max)"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                  {!isTopicValid && (
                    <p className="text-sm text-red-500">Topic is required.</p>
                  )}
                </div>
                <Button
                  onClick={handleGenerateTopics}
                  disabled={getTopicsMutation.isLoading}
                >
                  {getTopicsMutation.isLoading ? <Loader /> : 'Generate Topics'}
                </Button>
              </CardContent>
            </Card>
            <Card className="grow">
              <CardHeader>
                <CardTitle>Generated Topics</CardTitle>
                <CardDescription>
                  Select a topic to generate a LinkedIn post
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-full">
                  <div className="space-y-2">
                    {topics.map((topic, index) => (
                      <Button
                        key={index}
                        variant={
                          selectedTopic === topic ? 'secondary' : 'outline'
                        }
                        className="h-fit w-full justify-start text-left font-normal text-secondary-foreground"
                        onClick={() => handleSelectTopic(topic)}
                      >
                        {topic}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <Card className="flex basis-2/3 flex-col">
            <CardHeader>
              <div className="flex w-full flex-row justify-between">
                <div className="min-w-[300px]">
                  <CardTitle>Generated Post</CardTitle>
                  <CardDescription>
                    Preview and edit your LinkedIn post
                  </CardDescription>
                </div>
                <div className="flex w-full flex-row items-end justify-end">
                  <Button
                    onClick={handleRegeneratePost}
                    disabled={
                      regeneratePostMutation.isLoading ||
                      selectedTopic === '' ||
                      topic === ''
                    }
                    variant={'secondary'}
                    className="ml-auto w-fit"
                  >
                    {regeneratePostMutation.isLoading ? (
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="mr-2 h-4 w-4" />
                    )}
                    Regenerate Post
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-y-4">
                {editableSelectedIdea !== '' && (
                  <div className="flex flex-col gap-y-3">
                    <div className="flex flex-col gap-y-3">
                      <Label>Selected Idea</Label>
                      <Input
                        value={editableSelectedIdea}
                        onChange={(e) =>
                          setEditableSelectedIdea(e.target.value)
                        }
                        className="w-full"
                        title="Selected Idea of prompt"
                      />
                    </div>
                  </div>
                )}
                <div className="flex w-full flex-col gap-y-4">
                  <div className="flex w-full flex-row gap-x-4">
                    <Card className="flex flex-1 flex-col gap-y-3 rounded-md px-4 py-3 ">
                      <Label>Select a feel</Label>
                      <div className="flex flex-wrap gap-2">
                        {feels.map((feel) => (
                          <Badge
                            key={feel}
                            variant={
                              selectedFeel === feel ? 'default' : 'outline'
                            }
                            className={`cursor-pointer px-3 py-1 text-sm ${
                              selectedFeel !== feel ? 'opacity-50' : ''
                            }`}
                            onClick={() => setSelectedFeel(feel)}
                          >
                            {feel}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                    <Card className=" flex flex-1 flex-col gap-y-3 rounded-md px-4 py-3">
                      <Label>Prefered Post Size</Label>

                      <div className="flex flex-wrap gap-2">
                        {sizes.map((size) => (
                          <Badge
                            key={size}
                            variant={
                              selectedSize === size ? 'default' : 'outline'
                            }
                            className={`cursor-pointer px-3 py-1 text-sm ${
                              selectedSize !== size ? 'opacity-50' : ''
                            }`}
                            onClick={() => setSelectedSize(size)}
                          >
                            {size}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  </div>

                  <div className="mt-2 flex flex-col gap-y-3 p-1 pr-16">
                    <Label>Enter a prompt to enhace the post</Label>
                    <Input
                      value={userPrompt}
                      onChange={(e) => setUserPrompt(e.target.value)}
                      className="w-full"
                      placeholder="Enter a prompt to enhace the post"
                      title="Enter a prompt to enhace the post"
                    />
                  </div>
                </div>
                <Tabs defaultValue="post" className="w-full space-y-4">
                  <TabsContent value="post" className="h-full w-full grow">
                    <div className="flex w-full flex-col gap-2">
                      <div className="flex w-full flex-row justify-between gap-x-3">
                        <TabsList className="grid w-[200px] grid-cols-2">
                          <TabsTrigger value="post">Post</TabsTrigger>
                          <TabsTrigger value="preview">Preview</TabsTrigger>
                        </TabsList>
                        <div className="w-fit">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="mr-2"
                                  onClick={handleSaveToLibrary}
                                  disabled={saveToLibraryMutation.isLoading}
                                >
                                  {saveToLibraryMutation.isLoading ? (
                                    <Loader />
                                  ) : (
                                    <Library size={16} />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Add to library</p>
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={handleSaveToLibrary}
                                  disabled={saveToLibraryMutation.isLoading}
                                >
                                  {saveToLibraryMutation.isLoading ? (
                                    <Loader />
                                  ) : (
                                    <EditIcon size={16} />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Open in editor</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                      <ScrollArea className="grow">
                        <textarea
                          className="min-h-[250px] w-full rounded-md border p-2 text-sm"
                          value={generatedPost}
                          onChange={(e) => setGeneratedPost(e.target.value)}
                          placeholder="Your LinkedIn post will appear here..."
                        />
                      </ScrollArea>
                    </div>
                  </TabsContent>
                  <TabsContent value="preview">
                    <div className="flex w-full flex-col gap-2">
                      <div className="flex w-full flex-row justify-between gap-x-3">
                        <TabsList className="grid w-[200px] grid-cols-2">
                          <TabsTrigger value="post">Post</TabsTrigger>
                          <TabsTrigger value="preview">Preview</TabsTrigger>
                        </TabsList>
                        <div className="w-fit">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="mr-2"
                                  onClick={handleSaveToLibrary}
                                  disabled={saveToLibraryMutation.isLoading}
                                >
                                  {saveToLibraryMutation.isLoading ? (
                                    <Loader />
                                  ) : (
                                    <Library size={16} />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Add to library</p>
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={handleSaveToLibrary}
                                  disabled={saveToLibraryMutation.isLoading}
                                >
                                  {saveToLibraryMutation.isLoading ? (
                                    <Loader />
                                  ) : (
                                    <EditIcon size={16} />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Add to library</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                      <div className="prose max-w-none rounded-md border p-4">
                        <ReactMarkdown>{generatedPost}</ReactMarkdown>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <Button className="mt-4 w-full" onClick={handleProceed}>
                  Proceed
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default CreateLinkedInPost;
