'use client';
import React, { useState } from 'react';
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
  const router = useRouter();
  const showToast = useToastMessage();
  const [selectedFeel, setSelectedFeel] = useState<string>('');
  const feels = [
    'Professional',
    'Casual',
    'Humorous',
    'Inspirational',
    'Informative',
    'Curious'
  ];

  const getTopicsMutation = useGetTopics();
  const getContentMutation = useGetContent();
  const saveToLibraryMutation = useSaveToLibrary();
  const regeneratePostMutation = useRegeneratePost();

  const handleGenerateTopics = async () => {
    let valid = topic.trim() !== '';
    setIsTopicValid(valid);

    if (valid) {
      try {
        const response = await getTopicsMutation.mutateAsync({
          field: topic,
          count
        });
        setTopics(response.data.data);
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
        userPrompt: `Initial topic: ${editableSelectedIdea}. Add a CTA: Connect with me @ravi20930`,
        additionalParams: {
          initialUserInput: topic,
          aiGeneratedtopic: selectedTopic
        }
      });
      setGeneratedPost(response.data.data);
    } catch (error) {
      console.error('Error regenerating post:', error);
      showToast({ title: 'Failed to regenerate post', type: 'error' });
    }
  };

  const handleProceed = () => {
    router.push(
      `/dashboard/CreateLinkedInPost?post=${encodeURIComponent(generatedPost)}`
    );
  };

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
                <div className="mb-4">
                  <h3 className="mb-2 text-lg font-semibold">
                    Select Post Feel
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {feels.map((feel) => (
                      <Badge
                        key={feel}
                        variant={selectedFeel === feel ? 'default' : 'outline'}
                        className={`cursor-pointer ${
                          selectedFeel !== feel ? 'opacity-50' : ''
                        }`}
                        onClick={() => setSelectedFeel(feel)}
                      >
                        {feel}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={handleRegeneratePost}
                  disabled={regeneratePostMutation.isLoading}
                  className="w-full"
                >
                  {regeneratePostMutation.isLoading ? (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="mr-2 h-4 w-4" />
                  )}
                  Regenerate Post
                </Button>
                <Button className="mt-4 w-full" onClick={handleProceed}>
                  Proceed
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="flex basis-2/3 flex-col">
            <CardHeader>
              <CardTitle>Generated Post</CardTitle>
              <CardDescription>
                Preview and edit your LinkedIn post
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-y-4">
                {editableSelectedIdea !== '' && (
                  <div className="flex flex-col gap-y-3">
                    <Label>Selected Idea</Label>
                    <Input
                      value={editableSelectedIdea}
                      onChange={(e) => setEditableSelectedIdea(e.target.value)}
                      className="w-full"
                      title="Selected Idea of prompt"
                    />
                  </div>
                )}
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
                                <p>Add to library</p>
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
                        <div className="mb-4">
                          <h3 className="mb-2 text-lg font-semibold">
                            Select Post Feel
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {feels.map((feel) => (
                              <Badge
                                key={feel}
                                variant={
                                  selectedFeel === feel ? 'default' : 'outline'
                                }
                                className={`cursor-pointer ${
                                  selectedFeel !== feel ? 'opacity-50' : ''
                                }`}
                                onClick={() => setSelectedFeel(feel)}
                              >
                                {feel}
                              </Badge>
                            ))}
                          </div>
                        </div>
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
