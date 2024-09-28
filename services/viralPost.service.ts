import { useApiQuery } from '@/hooks/useApiQuery';
import { apiRoutes } from '@/config/api';

export interface ViralPost {
  _id: string;
  category: string;
  author: string;
  authorHandle: string;
  authorProfilePic: string;
  content: string;
  date: string;
  isSaved: boolean;
  likes: number;
  linkedInUrl: string;
}

interface ViralPostsResponse {
  categories: string[];
  posts: ViralPost[];
}

export const useViralPosts = (category: string = 'all') =>
  useApiQuery<ViralPostsResponse>(
    ['viralPosts', category],
    apiRoutes.viralsByCategory(category)
  );
