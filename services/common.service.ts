// src/services/createLinkedInPostService.ts
import { useApiQuery, useApiMutation } from '@/hooks/useApiQuery';
import { apiRoutes } from '@/config/api';
import { AxiosError, AxiosResponse } from 'axios';

interface QuickPostResponse {
  statusCode: number;
  message: string;
  data: string;
}

interface UserData {
  linConnected: boolean;
}

export const useQuickPost = () =>
  useApiMutation<QuickPostResponse, { content: string }>(
    apiRoutes.quickPost,
    'post',
    {
      onError: (error: AxiosError) => {
        console.error('Error in QuickPost:', error);
      }
    }
  );

export const useGetUserData = () =>
  useApiQuery<UserData>('userData', apiRoutes.user, {
    onError: (error: AxiosError) => {
      console.error('Error fetching user data:', error);
    }
  });

// export const useFileUpload = () =>
//   useApiMutation<{ fileUrl: string }, FormData>(apiRoutes.fileUpload, 'post', {
//     onError: (error: AxiosError) => {
//       console.error('Error uploading file:', error);
//     }
//   });

export const useConnectLinkedIn = () =>
  useApiMutation<{ success: boolean }, void>(
    apiRoutes.connectLinkedIn,
    'post',
    {
      onError: (error: AxiosError) => {
        console.error('Error connecting to LinkedIn:', error);
      }
    }
  );
