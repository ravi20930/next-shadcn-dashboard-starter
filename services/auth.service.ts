// src/services/authService.ts
import { useApiQuery, useApiMutation } from '../hooks/useApiQuery';
import { apiRoutes } from '@/config/api';

export const useLogin = () =>
  useApiMutation<{ token: string }, { email: string; password: string }>(
    apiRoutes.login
  );

export const useGoogleLogin = () =>
  useApiMutation<{ token: string }, { code: string }>(apiRoutes.googleLogin);

export const useLinkedInLogin = () =>
  useApiMutation<{ token: string }, { code: string }>(apiRoutes.linkedInLogin);

export const useGetUser = () => useApiQuery('user', apiRoutes.user);
