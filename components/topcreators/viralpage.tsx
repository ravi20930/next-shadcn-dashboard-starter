// // "use client";

// // import React, { useState, useEffect } from "react";
// // import { UserIcon } from "@heroicons/react/24/solid";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
// // import Loader from "lucide-react";

// // import renderPostContent from "../madeForYou/renderPostContent";

// // interface Viral {
// //     _id: string;
// //     author: string;
// //     industry: string;
// //     timeAgo: string;
// //     content: string;
// //     imageUrl: string | null;
// //     likes: number;
// //     linkedInUrl: string;
// //   }

// //   interface InspirationResponse {
// //     statusCode: number;
// //     message: string;
// //     data: Viral[];
// //   }

// //   interface ViralsProps {
// //     author: string;
// //     size: number;
// //     page: number;
// //     searchQuery: string;
// //     posts: Viral[];
// //     onSaveToLibrary: (postId: string) => Promise<void>;
// //     onSparkPost: (postId: string) => Promise<void>;
// //   }
// // const Virals: React.FC<ViralsProps> = ({
// //   author,
// //   size,
// //   page,
// //   searchQuery,
// //   posts,
// //   onSaveToLibrary,
// //   onSparkPost,
// // }) => {
// //   const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
// //   const [loading, setLoading] = useState<boolean>(false);
// //   const [error, setError] = useState<string | null>(null);
// //  console.log("posts",posts)// data fetching corectly
// //   const toggleExpand = (postId: string) => {
// //     setExpanded((prevState) => ({
// //       ...prevState,
// //       [postId]: !prevState[postId],
// //     }));
// //   };

// //   if (!Array.isArray(posts) || posts.length === 0) {
// //     return <p>No posts available.</p>;
// //   }

// //   // const columnsCount = 3;
// //   // const postsPerColumn = Math.ceil(posts.length / columnsCount);
// //   // const columns = Array.from({ length: columnsCount }, (_, columnIndex) =>
// //   //   posts.slice(columnIndex * postsPerColumn, (columnIndex + 1) * postsPerColumn)
// //   // );

// //   return (
// //     <div className="max-w-6xl mx-auto">
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
// //         {columns.map((column, index) => (
// //           <div key={index} className="flex flex-col gap-3">
// //             {column.map((viral) => (
// //               <div key={viral._id} className="">
// //                 <div className="mb-3 p-2 transition-transform duration-300 border border-gray-400 rounded-lg ease-in-out hover:transform hover:scale-100">
// //                   <div className="mb-2 flex items-center justify-between">
// //                     <div className="flex items-center space-x-4">
// //                       <div className="flex-shrink-0">
// //                         {viral.imageUrl ? (
// //                           <img
// //                             src={viral.imageUrl}
// //                             alt="Viral Post"
// //                             className="w-10 h-10 object-cover rounded-full"
// //                           />
// //                         ) : (
// //                           <UserIcon className="h-10 w-10 text-gray-500" />
// //                         )}
// //                       </div>
// //                       <div className="flex flex-col">
// //                         <p className="font-semibold">{viral.author}</p>
// //                         <p className="text-gray-500">{viral.industry}</p>
// //                       </div>
// //                     </div>
// //                     <div className="flex items-center space-x-2">
// //                       <a
// //                         href={viral.linkedInUrl}
// //                         target="_blank"
// //                         rel="noopener noreferrer"
// //                         className="text-blue-500 hover:text-blue-600 flex items-center space-x-2"
// //                       >
// //                         <svg
// //                           height="24"
// //                           preserveAspectRatio="xMinYMin"
// //                           viewBox="0 0 24 24"
// //                           width="24"
// //                           xmlns="http://www.w3.org/2000/svg"
// //                           className="w-6 h-6"
// //                         >
// //                           <path d="M15 11.13v3.697h-2.143v-3.45c0-.866-.31-1.457-1.086-1.457-.592 0-.945.398-1.1.784-.056.138-.071.33-.071.522v3.601h-2.144s.029-5.842 0-6.447h2.144v.913l-.014.021h.014v-.02c.285-.44.793-1.066 1.932-1.066 1.41 0 2.468.922 2.468 2.902zm-8.787-5.859c-.733 0-1.213.482-1.213 1.114 0 .62.466 1.115 1.185 1.115h.014c.748 0 1.213-.496 1.213-1.115-.014-.632-.465-1.114-1.199-1.114zm-1.086 9.556h2.144v-6.447h-2.144z" />
// //                           <path d="M4 2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-12a2 2 0 0 0 -2-2zm0-2h12a4 4 0 0 1 4 4v12a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4-4v-12a4 4 0 0 1 4-4z" />
// //                         </svg>
// //                       </a>
// //                     </div>
// //                   </div>
// //                   <hr className="mb-3" />
// //                   <div className="mb-2 mt-2 p-3">
// //                     {renderPostContent(viral.content, viral._id, expanded, toggleExpand)}
// //                   </div>
// //                   <div className="flex items-center justify-between">
// //                     <p className="text-gray-700 flex items-center">
// //                       <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />
// //                       {viral.likes}
// //                     </p>
// //                     <p className="text-gray-500 mb-2 text-right">{viral.timeAgo}</p>
// //                   </div>
// //                   <div className="flex justify-between mt-2">
// //                     <button
// //                       onClick={() => onSaveToLibrary(viral._id)}
// //                       className="px-3 py-1 bg-blue-500 text-white rounded"
// //                     >
// //                       Save to Library
// //                     </button>
// //                     <button
// //                       onClick={() => onSparkPost(viral._id)}
// //                       className="px-3 py-1 bg-green-500 text-white rounded"
// //                     >
// //                       Spark Post
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Virals;

// "use client";

// import React, { useState } from "react";
// import { UserIcon } from "@heroicons/react/24/solid";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

// import renderPostContent from "../madeForYou/renderPostContent";

// interface Viral {
//   _id: string;
//   author: string;
//   industry: string;
//   timeAgo: string;
//   content: string;
//   imageUrl: string | null;
//   likes: number;
//   linkedInUrl: string;
// }

// interface ViralsProps {
//   author: string;
//   size: number;
//   page: number;
//   searchQuery: string;
//   posts: Viral[];
//   onSaveToLibrary: (postId: string) => Promise<void>;
//   onSparkPost: (postId: string) => Promise<void>;
// }

// const Virals: React.FC<ViralsProps> = ({
//   author,
//   size,
//   page,
//   searchQuery,
//   posts,
//   onSaveToLibrary,
//   onSparkPost,
// }) => {
//   const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

//   const toggleExpand = (postId: string) => {
//     setExpanded((prevState) => ({
//       ...prevState,
//       [postId]: !prevState[postId],
//     }));
//   };

//   console.log("viral topcreators",posts)

//   if (!Array.isArray(posts) || posts.length === 0) {
//     return <p>No posts available.</p>;
//   }

//   return (
//     <div className="max-w-6xl mx-auto">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//         {posts.map((viral) => (
//           <div key={viral._id} className="">
//             <div className="mb-3 p-2 transition-transform duration-300 border border-gray-400 rounded-lg ease-in-out hover:transform hover:scale-100">
//               <div className="mb-2 flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <div className="flex-shrink-0">
//                     {viral.imageUrl ? (
//                       <img
//                         src={viral.imageUrl}
//                         alt="Viral Post"
//                         className="w-10 h-10 object-cover rounded-full"
//                       />
//                     ) : (
//                       <UserIcon className="h-10 w-10 text-gray-500" />
//                     )}
//                   </div>
//                   <div className="flex flex-col">
//                     <p className="font-semibold">{viral.author}</p>
//                     <p className="text-gray-500">{viral.industry}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <a
//                     href={viral.linkedInUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-500 hover:text-blue-600 flex items-center space-x-2"
//                   >
//                     <svg
//                       height="24"
//                       preserveAspectRatio="xMinYMin"
//                       viewBox="0 0 24 24"
//                       width="24"
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-6 h-6"
//                     >
//                       <path d="M15 11.13v3.697h-2.143v-3.45c0-.866-.31-1.457-1.086-1.457-.592 0-.945.398-1.1.784-.056.138-.071.33-.071.522v3.601h-2.144s.029-5.842 0-6.447h2.144v.913l-.014.021h.014v-.02c.285-.44.793-1.066 1.932-1.066 1.41 0 2.468.922 2.468 2.902zm-8.787-5.859c-.733 0-1.213.482-1.213 1.114 0 .62.466 1.115 1.185 1.115h.014c.748 0 1.213-.496 1.213-1.115-.014-.632-.465-1.114-1.199-1.114zm-1.086 9.556h2.144v-6.447h-2.144z" />
//                       <path d="M4 2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-12a2 2 0 0 0 -2-2zm0-2h12a4 4 0 0 1 4 4v12a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4-4v-12a4 4 0 0 1 4-4z" />
//                     </svg>
//                   </a>
//                 </div>
//               </div>
//               <hr className="mb-3" />
//               <div className="mb-2 mt-2 p-3">
//                 {renderPostContent(viral.content, viral._id, expanded, toggleExpand)}
//               </div>
//               <div className="flex items-center justify-between">
//                 <p className="text-gray-700 flex items-center">
//                   <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />
//                   {viral.likes}
//                 </p>
//                 <p className="text-gray-500 mb-2 text-right">{viral.timeAgo}</p>
//               </div>
//               <div className="flex justify-between mt-2">
//                 <button
//                   onClick={() => onSaveToLibrary(viral._id)}
//                   className="px-3 py-1 bg-blue-500 text-white rounded"
//                 >
//                   Save to Library
//                 </button>
//                 <button
//                   onClick={() => onSparkPost(viral._id)}
//                   className="px-3 py-1 bg-green-500 text-white rounded"
//                 >
//                   Spark Post
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Virals;

'use client';

import React, { useState } from 'react';
import { UserIcon } from '@heroicons/react/24/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import renderPostContent from '../madeForYou/renderPostContent';

interface Viral {
  _id: string;
  author: string;
  industry: string;
  timeAgo: string;
  content: string;
  imageUrl: string | null;
  likes: number;
  linkedInUrl: string;
}

interface ApiResponse {
  statusCode: number;
  message: string;
  data: Viral[];
}

interface ViralsProps {
  author: string;
  size: number;
  page: number;
  searchQuery: string;
  posts: ApiResponse;
  onSaveToLibrary: (postId: string) => Promise<void>;
  onSparkPost: (postId: string) => Promise<void>;
}

const Virals: React.FC<ViralsProps> = ({
  author,
  size,
  page,
  searchQuery,
  posts,
  onSaveToLibrary,
  onSparkPost
}) => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const toggleExpand = (postId: string) => {
    setExpanded((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId]
    }));
  };

  if (
    !posts ||
    !posts.data ||
    !Array.isArray(posts.data) ||
    posts.data.length === 0
  ) {
    return <p>No posts available.</p>;
  }

  return (
    <div className="mx-auto max-w-6xl">
      <h2 className="mb-4 text-2xl font-bold">{posts.message}</h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {posts.data.map((viral) => (
          <div key={viral._id} className="">
            <div className="mb-3 rounded-lg border border-gray-400 p-2 transition-transform duration-300 ease-in-out hover:scale-100 hover:transform">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {viral.imageUrl ? (
                      <img
                        src={viral.imageUrl}
                        alt="Viral Post"
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <UserIcon className="h-10 w-10 text-gray-500" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <p className="font-semibold">{viral.author}</p>
                    <p className="text-gray-500">{viral.industry}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href={viral.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" flex items-center space-x-2 hover:text-blue-600"
                  >
                    <svg
                      height="24"
                      preserveAspectRatio="xMinYMin"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                    >
                      <path d="M15 11.13v3.697h-2.143v-3.45c0-.866-.31-1.457-1.086-1.457-.592 0-.945.398-1.1.784-.056.138-.071.33-.071.522v3.601h-2.144s.029-5.842 0-6.447h2.144v.913l-.014.021h.014v-.02c.285-.44.793-1.066 1.932-1.066 1.41 0 2.468.922 2.468 2.902zm-8.787-5.859c-.733 0-1.213.482-1.213 1.114 0 .62.466 1.115 1.185 1.115h.014c.748 0 1.213-.496 1.213-1.115-.014-.632-.465-1.114-1.199-1.114zm-1.086 9.556h2.144v-6.447h-2.144z" />
                      <path d="M4 2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-12a2 2 0 0 0 -2-2zm0-2h12a4 4 0 0 1 4 4v12a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4-4v-12a4 4 0 0 1 4-4z" />
                    </svg>
                  </a>
                </div>
              </div>
              <hr className="mb-3" />
              <div className="mb-2 mt-2 p-3">
                {renderPostContent(
                  viral.content,
                  viral._id,
                  expanded,
                  toggleExpand
                )}
              </div>
              <div className="flex items-center justify-between">
                <p className="flex items-center text-gray-700">
                  <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />
                  {viral.likes}
                </p>
                <p className="mb-2 text-right text-gray-500">{viral.timeAgo}</p>
              </div>
              <div className="mt-2 flex justify-between">
                <button
                  onClick={() => onSaveToLibrary(viral._id)}
                  className="rounded bg-blue-500 px-3 py-1 text-white"
                >
                  Save to Library
                </button>
                <button
                  onClick={() => onSparkPost(viral._id)}
                  className="rounded bg-green-500 px-3 py-1 text-white"
                >
                  Spark Post
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Virals;
