export interface ApiConfig {
  apiKey: string;
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface ApiError {
  status: number;
  message: string;
  data?: unknown;
}

export interface ApiResponse<T = any> {
  SuccessMessage?: string[];
  ErrorMessage?: string[];
  WarningMessage?: string[];
  Data: T | null;
  IsSuccess?: boolean;
  TotalNumberOfRecord?: number;
  HttpStatusCode?: number;
  status: number;
  headers: Headers;
}

// export interface ApiResponse<T = unknown> {
//   data: T | null;
//   status: number;
//   headers: Headers;
// }

export interface RequestConfig {
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: unknown;
  signal?: AbortSignal;
  _retry?: boolean;
}

export interface RequestOptions {
  headers?: Record<string, string>;
  body?: unknown;
  signal?: AbortSignal;
}

export interface RetryConfig {
  maxRetries: number;
  initialDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
}

export interface ErrorResponse {
  status: number;
  type: string;
  message: string;
  recoverable: boolean;
}
