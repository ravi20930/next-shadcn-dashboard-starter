// interface Viral {
//     _id: string;
//     author: string;
//     industry: string;
//     timeAgo: string;
//     content: string;
//     imageUrl: string | null;
//     likes: number;
//     linkedInUrl: string;
//   }

//   interface InspirationResponse {
//     statusCode: number;
//     message: string;
//     data: Viral[];
//   }

//   interface ViralsProps {
//     author: string;
//     size: number;
//     page: number;
//     searchQuery: string;
//     posts: Viral[];
//     onSaveToLibrary: (postId: string) => Promise<void>;
//     onSparkPost: (postId: string) => Promise<void>;
//   }

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

interface InspirationResponse {
  statusCode: number;
  message: string;
  data: Viral[];
}
