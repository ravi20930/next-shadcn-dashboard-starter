// import React, { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Loader } from 'lucide-react';
// import renderPostContent from './renderPostContent';

// interface PostContent {
//   _id: string;
//   topic: string;
//   content: string;
// }

// interface Post {
//   userId: string;
//   dateTime: string;
//   topicsArray: string[];
//   contentArray: PostContent[];
// }

// interface ApiResponse {
//   statusCode: number;
//   message: string;
//   data: Post[]; // Posts are now represented as an array inside ApiResponse
// }

// interface TailoredPostsProps {
//   refreshType: 'default' | 'ideas' | 'content';
//   // posts: ApiResponse | undefined; // Change to ApiResponse type
//   posts: { data: Post[] } | undefined;
//   isLoading: boolean;
//   error: Error | null;
//   onQuickPost: (content: string) => Promise<void>;
// }

// const TailoredPosts: React.FC<TailoredPostsProps> = ({
//   refreshType,
//   posts,
//   isLoading,
//   error,
//   onQuickPost,
// }) => {
//   const [expandedPosts, setExpandedPosts] = useState<{ [key: string]: boolean }>({});
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [postToBePosted, setPostToBePosted] = useState<string | null>(null);

//   const handleToggleExpand = (postId: string) => {
//     setExpandedPosts((prevState) => ({
//       ...prevState,
//       [postId]: !prevState[postId],
//     }));
//   };

//   const openConfirmationModal = (postContent: string) => {
//     setPostToBePosted(postContent);
//     setIsModalOpen(true);
//   };

//   const closeConfirmationModal = () => {
//     setIsModalOpen(false);
//     setPostToBePosted(null);
//   };

//   if (isLoading) return <Loader />;
//   console.log("posts are", posts)
//   console.log("Is posts an array?", Array.isArray(posts));
//   console.log("First post contentArray:", posts?.data[0]?.contentArray);
//   console.log(" topicsArray:", posts?.data[0]?. topicsArray);

//   if (error) return <p className="text-red-500">Error loading tailored posts: {error.message}</p>;

//   return (
//     <div>
//       {/* Display last updated date and time */}
//       <div style={{ textAlign: 'right', marginBottom: '20px' }}>
//         <p className="p-2 border text-blue-400 rounded-md bg-gray-100">
//           Posts updated on {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
//         </p>
//       </div>

//       {/* Render posts if available */}
//       {Array.isArray(posts) && posts.length > 0 && posts[0]?.contentArray.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {posts[0].contentArray.map((post) => (
//             <Card key={post._id}>
//               <CardContent className="p-4">
//               <div className="mt-2 mb-4 p-3">
//                       {refreshType === 'ideas' ? (
//                         <p>{post.topic}</p>
//                       ) : (
//                         renderPostContent(post.content, post._id, expandedPosts, handleToggleExpand)
//                       )}
//                     </div>
//                 <div className="flex justify-between items-center mt-4">
//                   {/* Edit button for quick post editing */}
//                   <Button variant="outline" onClick={() => onQuickPost(post.content)}>
//                     Edit
//                   </Button>
//                   {/* Button to post the content to LinkedIn */}
//                   <Button
//                     onClick={() => openConfirmationModal(post.content)}
//                     className="bg-blue-800 text-white"
//                   >
//                     Post on LinkedIn
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500">No tailored posts available at the moment.</p>
//       )}

//       {/* Confirmation Modal (if implemented elsewhere) */}
//       {isModalOpen && (
//         <div className="modal">
//           <p>Are you sure you want to post this on LinkedIn?</p>
//           <Button onClick={closeConfirmationModal}>Cancel</Button>
//           <Button onClick={() => confirmPost()}>Confirm</Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TailoredPosts;
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader } from 'lucide-react';
import renderPostContent from './renderPostContent';

interface PostContent {
  _id: string;
  topic: string;
  content: string;
}

interface Post {
  userId: string;
  dateTime: string;
  topicsArray: string[];
  contentArray: PostContent[];
}

interface ApiResponse {
  statusCode: number;
  message: string;
  data: Post[]; // Posts represented as an array inside ApiResponse
}

interface TailoredPostsProps {
  refreshType: 'default' | 'ideas' | 'content';
  posts: { data: Post[] } | undefined;
  isLoading: boolean;
  error: Error | null;
  onQuickPost: (content: string) => Promise<void>;
}

const TailoredPosts: React.FC<TailoredPostsProps> = ({
  refreshType,
  posts,
  isLoading,
  error,
  onQuickPost
}) => {
  const [expandedPosts, setExpandedPosts] = useState<{
    [key: string]: boolean;
  }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToBePosted, setPostToBePosted] = useState<string | null>(null);

  const handleToggleExpand = (postId: string) => {
    setExpandedPosts((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId]
    }));
  };

  const openConfirmationModal = (postContent: string) => {
    setPostToBePosted(postContent);
    setIsModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsModalOpen(false);
    setPostToBePosted(null);
  };

  const confirmPost = async () => {
    if (postToBePosted) {
      await onQuickPost(postToBePosted);
      closeConfirmationModal();
    }
  };

  if (isLoading) return <Loader />;

  if (error)
    return (
      <p className="text-red-500">
        Error loading tailored posts: {error.message}
      </p>
    );

  // Log the posts for debugging
  console.log('posts are', posts);
  console.log('First post contentArray:', posts?.data[0]?.contentArray);
  console.log('First post topicsArray:', posts?.data[0]?.topicsArray);

  return (
    <div>
      {/* Display last updated date and time */}
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <p className="rounded-md border bg-gray-100 p-2 text-blue-400">
          Posts updated on {new Date().toLocaleDateString()}{' '}
          {new Date().toLocaleTimeString()}
        </p>
      </div>

      {/* Render posts if available */}
      {posts?.data && posts.data.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.data.map((post) => (
            <Card key={post.userId}>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold">{post.userId}</h2>
                <p className="text-sm text-gray-600">
                  {new Date(post.dateTime).toLocaleString()}
                </p>

                <h3 className="text-md mt-4 font-medium">Topics:</h3>
                <ul className="mb-4 list-disc pl-5">
                  {post.topicsArray.map((topic, idx) => (
                    <li key={idx}>{topic}</li>
                  ))}
                </ul>

                <h3 className="text-md mt-4 font-medium">Content:</h3>
                {post.contentArray.map((contentItem) => (
                  <div key={contentItem._id} className="my-2">
                    <h4 className="font-bold">{contentItem.topic}</h4>
                    <p>{contentItem.content}</p>
                  </div>
                ))}

                <div className="mt-4 flex items-center justify-between">
                  {/* Edit button for quick post editing */}
                  <Button
                    variant="outline"
                    onClick={() => onQuickPost(post.contentArray[0].content)}
                  >
                    Edit
                  </Button>
                  {/* Button to post the content to LinkedIn */}
                  <Button
                    onClick={() =>
                      openConfirmationModal(post.contentArray[0].content)
                    }
                    className="bg-blue-800 text-white"
                  >
                    Post on LinkedIn
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          No tailored posts available at the moment.
        </p>
      )}

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="modal">
          <p>Are you sure you want to post this on LinkedIn?</p>
          <Button onClick={closeConfirmationModal}>Cancel</Button>
          <Button onClick={confirmPost}>Confirm</Button>
        </div>
      )}
    </div>
  );
};

export default TailoredPosts;
