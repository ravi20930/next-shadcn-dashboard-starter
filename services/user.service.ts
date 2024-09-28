import { useApiQuery, useApiMutation } from '../hooks/useApiQuery';
import { apiRoutes } from '@/config/api';

// export const useUpdatePersona = () =>
//   useApiMutation(apiRoutes.updatePersona, 'patch');
export const useUpdatePersona = () =>
  useApiMutation(apiRoutes.updatePersona, 'put');

export const useConnectLinkedIn = () =>
  useApiMutation(apiRoutes.connectLinkedIn);

export const useGetTopics = () => useApiQuery('topics', apiRoutes.getTopics);

export const useGetUser = () => useApiQuery('user', apiRoutes.user);
export const useGetpersona = () =>
  useApiQuery('persona', apiRoutes.fetchpersona);

export const useGetContentByTopic = (topic: string) =>
  useApiQuery(['content', topic], apiRoutes.getContentByTopic, {
    enabled: !!topic
  });
