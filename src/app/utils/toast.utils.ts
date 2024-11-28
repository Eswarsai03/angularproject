import { HotToastService } from '@ngneat/hot-toast';

export const showSuccessToast = (toast: HotToastService, message: string) => {
  toast.success(message, {
    duration: 3000,
    position: 'top-right'
  });
};

export const showErrorToast = (toast: HotToastService, message: string) => {
  toast.error(message, {
    duration: 3000,
    position: 'top-right'
  });
};