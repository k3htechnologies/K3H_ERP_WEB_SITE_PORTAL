import type { ToastProps } from "@/shared/components/Toast/Toast";

export interface ToastOptions {
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
}

export interface ToastContextType {
  toasts: ToastProps[];
  addToast: (opts: ToastOptions) => string;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
  showSuccess: (title: string, message?: string, duration?: number) => string;
  showError: (title: string, message?: string, duration?: number) => string;
  showWarning: (title: string, message?: string, duration?: number) => string;
  showInfo: (title: string, message?: string, duration?: number) => string;
}
