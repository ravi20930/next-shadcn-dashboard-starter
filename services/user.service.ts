import { useApiQuery, useApiMutation } from '../hooks/useApiQuery';
import { apiRoutes } from '@/config/api';

export const useUpdatePersona = () =>
  useApiMutation(apiRoutes.updatePersona, 'patch');

export const useConnectLinkedIn = () =>
  useApiMutation(apiRoutes.connectLinkedIn);

export const useGetTopics = () => useApiQuery('topics', apiRoutes.getTopics);

interface User {
  name: string;
  picture?: string;
  // Add other user properties as needed
}

export const useGetUser = () => useApiQuery<User>('user', apiRoutes.user);

export const useGetContentByTopic = (topic: string) =>
  useApiQuery(['content', topic], apiRoutes.getContentByTopic, {
    enabled: !!topic
  });
