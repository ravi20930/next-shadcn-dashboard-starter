import { useApiMutation } from '../hooks/useApiQuery';
import { apiRoutes } from '@/config/api';

export const useGetTopics = () => {
  return useApiMutation(apiRoutes.getTopics, 'post');
};

export const useGetContent = () => {
  return useApiMutation(apiRoutes.getContentByTopic, 'post');
};

export const useSaveToLibrary = () => {
  return useApiMutation(apiRoutes.saveToUserLibrary, 'post');
};

export const useRegeneratePost = () => {
  return useApiMutation('/user/spark-post/', 'post');
};
