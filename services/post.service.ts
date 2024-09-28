// src/services/postService.ts
import { useApiQuery, useApiMutation } from '../hooks/useApiQuery';
import { apiRoutes } from '@/config/api';

export const useQuickPost = () => useApiMutation(apiRoutes.quickPost);

export const useSaveToUserLibrary = () =>
  useApiMutation(apiRoutes.saveToUserLibrary);

export const useSparkPost = () => useApiMutation(apiRoutes.sparkPost);

export const useCreatePost = () => useApiMutation(apiRoutes.createPost);

export const useUpdateLibraryPost = () =>
  useApiMutation(apiRoutes.updateLibraryPost, 'patch');

export const useTailoredPosts = () =>
  useApiQuery('tailoredPosts', apiRoutes.tailoredPosts);

export const useSeedIdeas = () => useApiMutation(apiRoutes.seedIdeas);

export const useSeedContent = () => useApiMutation(apiRoutes.seedContent);

export const useViralsByCategory = (category: string) =>
  useApiQuery(['virals', category], apiRoutes.viralsByCategory(category), {
    enabled: !!category
  });

export const useInspiration = () =>
  useApiQuery('inspiration', apiRoutes.inspiration);

export const useUserLibrary = () =>
  useApiQuery('userLibrary', apiRoutes.fetchuserlibrary);
