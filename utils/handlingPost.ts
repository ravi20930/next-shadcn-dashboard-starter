import { useRouter } from 'next/navigation';
export const useHandleProceed = (generatedPost: string) => {
  const router = useRouter();
  router.push(
    `/dashboard/create-post?post=${encodeURIComponent(generatedPost)}`
  );
};
