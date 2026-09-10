import { ApiClientError } from "@/app/http/error";
import type { RetryConfig } from "@/app/http/types";

export class RetryPolicy {
    private config: RetryConfig;
    
  constructor(config: RetryConfig) {
    this.config  = config
  }

  async executeWithRetry<T>(
    fn: () => Promise<T>,
    isRetryable: (error: ApiClientError) => boolean
  ): Promise<T> {
    let lastError: ApiClientError | null = null;
    
    for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        if (error instanceof ApiClientError) {
          lastError = error;
          
          // Don't retry if error isn't retryable
          if (!isRetryable(error)) {
            throw error;
          }
          
          // Don't retry on last attempt
          if (attempt < this.config.maxRetries) {
            const delay = this.calculateDelay(attempt);
            await this.sleep(delay);
          }
        } else {
          throw error;
        }
      }
    }

    throw lastError;
  }

  private calculateDelay(attempt: number): number {
    const exponentialDelay = this.config.initialDelay * 
      Math.pow(this.config.backoffMultiplier, attempt);
    
    return Math.min(exponentialDelay, this.config.maxDelay);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
