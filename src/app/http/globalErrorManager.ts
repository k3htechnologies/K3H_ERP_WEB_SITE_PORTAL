import { ApiClientError } from "@/app/http/error";

export type ErrorHandler = (error: ApiClientError, requestUrl?: string) => void;

class GlobalErrorManager {
  private handler: ErrorHandler | null = null;

  private isModalOpen = false;

  private lastShownAt = 0;

  private readonly cooldownMs = 5000;

  register(handler: ErrorHandler) {
    this.handler = handler;
  }

  unregister() {
    this.handler = null;
  }

  show(error: ApiClientError, requestUrl?: string) {
    const now = Date.now();
    if (this.isModalOpen) {
      return;
    }
    if (now - this.lastShownAt < this.cooldownMs) {
      return;
    }
    this.lastShownAt = now;
    this.isModalOpen = true;
    this.handler?.(error, requestUrl);
  }

  close() {
    this.isModalOpen = false;
  }
}

export const globalErrorManager = new GlobalErrorManager();
