'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface PostContentProps {
  content: string | null; // Allow content to be null
  postId: string;
}

const formatContent = (content: string) => {
  // Replace double newlines with paragraph tags and single newlines with line breaks
  return content.split('\n\n').map((paragraph, index) => (
    <p key={index}>
      {paragraph.split('\n').map((line, i) => (
        <React.Fragment key={i}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </p>
  ));
};

const PostContent: React.FC<PostContentProps> = ({ content, postId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 300;

  // If content is null or undefined, return null to prevent rendering anything
  if (!content) {
    return null;
  }

  const shortContent = content.slice(0, maxLength);

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div>
      {formatContent(isExpanded ? content : shortContent)}
      {content.length > maxLength && (
        <Button onClick={handleToggleExpand}>
          {isExpanded ? 'See Less' : 'See More'}
        </Button>
      )}
    </div>
  );
};

export default PostContent;
