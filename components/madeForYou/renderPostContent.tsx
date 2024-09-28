// import React from 'react';
// import { Button } from '@/components/ui/button';

// export type ExpandedPosts = {
//   [postId: string]: boolean;
// };

// const formatContent = (content: string): JSX.Element[] => {
//   return content.split('\n\n').map((paragraph, index) => (
//     <p key={index} className="line-blur mb-2">
//       {paragraph.split('\n').map((line, i) => (
//         <React.Fragment key={i}>
//           {line}
//           <br />
//         </React.Fragment>
//       ))}
//     </p>
//   ));
// };

// const renderPostContent = (
//   content: string,
//   postId: string,
//   expandedPosts: ExpandedPosts,
//   handleToggleExpand: (postId: string) => void
// ): JSX.Element => {
//   const isExpanded = expandedPosts[postId];
//   const maxLength = 300;
//   const shortContent = content.slice(0, maxLength);

//   return (
//     <div>
//       {formatContent(isExpanded ? content : shortContent)}
//       {content.length > maxLength && (
//         <Button
//           onClick={() => handleToggleExpand(postId)}
//           className="text-blue-500 mt-2"
//         >
//           {isExpanded ? "See Less" : "See More"}
//         </Button>
//       )}
//     </div>
//   );
// };

// export default renderPostContent;

import React from 'react';
import { Button } from '@/components/ui/button';

type ExpandedPosts = {
  [postId: string]: boolean;
};

const formatContent = (content: string): JSX.Element[] => {
  return content.split('\n\n').map((paragraph, index) => (
    <p key={index} className="line-blur mb-2">
      {paragraph.split('\n').map((line, i) => (
        <React.Fragment key={i}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </p>
  ));
};

const renderPostContent = (
  content: string,
  postId: string,
  expandedPosts: ExpandedPosts,
  handleToggleExpand: (postId: string) => void
): JSX.Element => {
  const isExpanded = expandedPosts[postId];
  const maxLength = 300;
  const shortContent = content.slice(0, maxLength);

  return (
    <div>
      {formatContent(isExpanded ? content : shortContent)}
      {content.length > maxLength && (
        <p onClick={() => handleToggleExpand(postId)}>
          {isExpanded ? 'See Less' : 'See More'}
        </p>
      )}
    </div>
  );
};

export default renderPostContent;
