import { isDevelopment } from "@/app/config";
import type { ErrorInfo } from "react";

interface ErrorFallbackProps {
  error: Error;
  errorInfo: ErrorInfo | null;
  onReset: () => void;
}

const isDev = isDevelopment();

export function ErrorFallback({
  error,
  errorInfo,
  onReset,
}: ErrorFallbackProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-5xl rounded-xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-red-600">
          Something went wrong
        </h1>

        <p className="mt-2 text-slate-600">
          An unexpected error occurred while rendering this page.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onReset}
            className="rounded-lg bg-black px-4 py-2 text-white"
          >
            Retry
          </button>

          <button
            onClick={() => window.location.reload()}
            className="rounded-lg border px-4 py-2"
          >
            Reload Page
          </button>
        </div>

        {isDev && (
          <>
            <div className="mt-8">
              <h2 className="mb-2 font-semibold">Error Message</h2>

              <pre className="overflow-auto rounded-lg bg-slate-900 p-4 text-sm text-red-400">
                {error.stack}
              </pre>
            </div>

            {errorInfo?.componentStack && (
              <div className="mt-6">
                <h2 className="mb-2 font-semibold">Component Stack</h2>

                <pre className="overflow-auto rounded-lg bg-slate-900 p-4 text-sm text-green-400">
                  {errorInfo.componentStack}
                </pre>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
