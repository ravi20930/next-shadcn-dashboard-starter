import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

export interface ToastMessageProps {
  title: string;
  description?: string;
  type: 'success' | 'info' | 'warn' | 'destructive' | 'error';
  actionText?: string;
  actionHandler?: () => void;
  options?: any;
}

const useToastMessage = () => {
  const { toast } = useToast();

  const showToast = ({
    title,
    description,
    type = 'info',
    actionText,
    actionHandler,
    options = {}
  }: ToastMessageProps) => {
    const toastOptions = {
      title,
      description,
      action: actionText ? (
        <ToastAction altText={actionText} onClick={actionHandler}>
          {actionText}
        </ToastAction>
      ) : null,
      ...options
    };

    switch (type) {
      case 'success':
        toast({ ...toastOptions, variant: 'success' });
        break;
      case 'info':
        toast({ ...toastOptions, variant: 'info' });
        break;
      case 'warn':
        toast({ ...toastOptions, variant: 'warn' });
        break;
      case 'error':
        toast({ ...toastOptions, variant: 'error' });
        break;
      case 'destructive':
        toast({ ...toastOptions, variant: 'destructive' });
        break;
      default:
        // toast({ ...toastOptions, variant: "info" });
        break;
    }
  };

  return showToast;
};

export default useToastMessage;

// Example usage
// export const ToastDemo = () => {
//   const showToast = useToastMessage();

//   return (
//     <Button
//       onClick={() => {
//         showToast({
//           title: "Scheduled: Catch up",
//           description: "Friday, February 10, 2023 at 5:57 PM",
//           type: "info",
//         });
//       }}
//     >
//       Show Toast
//     </Button>
//   );
// };
