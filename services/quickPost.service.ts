import { useApiMutation } from '../hooks/useApiQuery';
import { apiRoutes } from '@/config/api';

export const useGetTopics = () => {
  const mutation = useApiMutation(apiRoutes.getTopics, 'post');
  return {
    ...mutation,
    mutateAsync: async (data: any) => {
      try {
        const result = await mutation.mutateAsync(data);
        console.log('[DEBUG] useGetTopics result:', result);
        return result;
      } catch (error) {
        console.error('[DEBUG] useGetTopics error:', error);
        throw error;
      }
    }
  };
};

export const useGetContent = () => {
  const mutation = useApiMutation(apiRoutes.getContentByTopic, 'post');
  return {
    ...mutation,
    mutateAsync: async (data: any) => {
      try {
        const result = await mutation.mutateAsync(data);
        console.log('[DEBUG] useGetContent result:', result);
        return result;
      } catch (error) {
        console.error('[DEBUG] useGetContent error:', error);
        throw error;
      }
    }
  };
};

export const useSaveToLibrary = () => {
  const mutation = useApiMutation(apiRoutes.saveToUserLibrary, 'post');
  return {
    ...mutation,
    mutateAsync: async (data: any) => {
      try {
        const result = await mutation.mutateAsync(data);
        console.log('[DEBUG] useSaveToLibrary result:', result);
        return result;
      } catch (error) {
        console.error('[DEBUG] useSaveToLibrary error:', error);
        throw error;
      }
    }
  };
};

export const useRegeneratePost = () => {
  const mutation = useApiMutation('/user/spark-post/', 'post');
  return {
    ...mutation,
    mutateAsync: async (data: any) => {
      try {
        const result = await mutation.mutateAsync(data);
        console.log('[DEBUG] useRegeneratePost result:', result);
        return result;
      } catch (error) {
        console.error('[DEBUG] useRegeneratePost error:', error);
        throw error;
      }
    }
  };
};
