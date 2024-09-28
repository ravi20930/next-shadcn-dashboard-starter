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

// Define a more flexible data type
type ApiData = any;
interface ApiResponse<T> {
  data?: T;
  // Add other properties that might be in the response
}

export const useApiQuery = <TData = unknown>(
  queryKey: QueryKey,
  url: string,
  options?: Omit<
    UseQueryOptions<ApiResponse<TData>, AxiosError>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<ApiResponse<TData>, AxiosError>(
    queryKey,
    async () => {
      const response = await apiClient.get<ApiResponse<TData>>(url);
      return response.data;
    },
    options
  );
};

export const useApiMutation = <TData = unknown, TVariables = unknown>(
  url: string,
  method: 'post' | 'put' | 'patch' | 'delete' = 'post',
  options?: Omit<
    UseMutationOptions<AxiosResponse<TData>, AxiosError, TVariables>,
    'mutationFn'
  >
) => {
  return useMutation<AxiosResponse<TData>, AxiosError, TVariables>(
    //@ts-ignore
    (data) => apiClient[method](url, data),
    options
  );
};
