import { useApiMutation } from '../hooks/useApiQuery';
import { apiRoutes } from '@/config/api';

export const useLogin = () => {
  return useApiMutation(apiRoutes.login, 'post');
};

export const useGoogleAuth = () => {
  return useApiMutation(apiRoutes.googleLogin, 'post');
};

export const useLinkedInAuth = () => {
  return useApiMutation(apiRoutes.linkedInLogin, 'post');
};

export const useGetUser = () => {
  return useApiMutation(apiRoutes.user, 'post');
};
