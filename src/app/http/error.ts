export type ErrorCategory =
  | "network"
  | "application";

export class ApiClientError extends Error {
  public status: number;
  public response: Response | null;
  public data: unknown;
  public cancelled: boolean;
 public category: ErrorCategory;

  constructor(status: number, message: string, response: Response | null, data : unknown = null, cancelled : boolean = false, category: ErrorCategory = "network") {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.response = response;
    this.data = data;
    this.cancelled = cancelled;
    this.category = category;
  }

  isNetworkError(): boolean {
    return this.status === 0;
  }

  isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  isServerError(): boolean {
    return this.status >= 500;
  }

  isTimeout(): boolean {
    return this.message.includes('timeout');
  }
}
