// src/hooks/useApiQuery.ts
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  QueryKey
} from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { apiClient } from './interceptor';
import { queryClient } from '../utils/useQueryClient';

export const useApiQuery = <T>(
  queryKey: QueryKey,
  url: string,
  options?: UseQueryOptions<T, AxiosError>
) => {
  return useQuery<T, AxiosError>(
    queryKey,
    () => apiClient.get(url).then((res) => res.data),
    {
      ...options,
      queryClient // Add this line
    }
  );
};

export const useApiMutation = <T, V>(
  url: string,
  method: 'post' | 'put' | 'patch' | 'delete' = 'post',
  options?: UseMutationOptions<AxiosResponse<T>, AxiosError, V>
) => {
  return useMutation<AxiosResponse<T>, AxiosError, V>(
    (data) => apiClient[method](url, data),
    {
      ...options,
      queryClient // Add this line
    }
  );
};
