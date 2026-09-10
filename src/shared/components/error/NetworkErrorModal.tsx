import { useEffect } from "react";
import { AlertTriangle, RefreshCw, WifiOff } from "lucide-react";

import { isDevelopment } from "@/app/config";
import { ApiClientError } from "@/app/http/error";

interface ErrorModalProps {
  error: ApiClientError | null;
  requestUrl?: string;
  open: boolean;
  onClose: () => void;
}

export function NetworkErrorModal({
  error,
  requestUrl,
  open,
  onClose,
}: ErrorModalProps) {
  const isDev = isDevelopment();

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open || !error) {
    return null;
  }

  const isApplicationError =
    error.category === "application";

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 p-4">
      <div className="flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        {/* HEADER */}

        <div
          className={`border-b p-6 ${
            isApplicationError
              ? "border-orange-200 bg-orange-50"
              : "border-red-200 bg-red-50"
          }`}
        >
          <div className="flex items-center gap-3">
            {isApplicationError ? (
              <AlertTriangle className="h-7 w-7 text-orange-600" />
            ) : (
              <WifiOff className="h-7 w-7 text-red-600" />
            )}

            <div>
              <h2
                className={`text-xl font-semibold ${
                  isApplicationError
                    ? "text-orange-700"
                    : "text-red-700"
                }`}
              >
                {isApplicationError
                  ? "Application Error"
                  : "Request Failed"}
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                {isApplicationError
                  ? "An unexpected frontend error occurred."
                  : "A network or server error occurred."}
              </p>
            </div>
          </div>
        </div>

        {/* BODY */}

        <div className="flex-1 overflow-y-auto p-6">
          {isApplicationError ? (
            <>
              {/* PRODUCTION UI */}

              {!isDev && (
                <div className="mx-auto mt-10 max-w-xl text-center">
                  <AlertTriangle className="mx-auto mb-4 h-16 w-16 text-orange-500" />

                  <h3 className="text-2xl font-semibold">
                    Something unexpected happened
                  </h3>

                  <p className="mt-4 text-gray-600">
                    The application encountered an
                    unexpected problem.
                  </p>

                  <p className="mt-2 text-gray-600">
                    Please refresh the page and
                    try again.
                  </p>
                </div>
              )}

              {/* DEV UI */}

              {isDev && (
                <div className="space-y-5">
                  <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                    <h3 className="mb-2 font-semibold text-orange-800">
                      Error Message
                    </h3>

                    <pre className="overflow-auto whitespace-pre-wrap text-sm">
                      {error.message}
                    </pre>
                  </div>

                  {(error.data as string) && (
                    <div>
                      <h3 className="mb-2 font-semibold">
                        Error Details
                      </h3>

                      <pre className="max-h-72 overflow-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
                        {JSON.stringify(
                          error.data,
                          null,
                          2,
                        )}
                      </pre>
                    </div>
                  )}

                  {error.stack && (
                    <div>
                      <h3 className="mb-2 font-semibold">
                        Stack Trace
                      </h3>

                      <pre className="max-h-125 overflow-auto rounded-lg bg-slate-900 p-4 text-sm text-red-300">
                        {error.stack}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              {!isDev && (
                <div className="mx-auto mt-10 max-w-xl text-center">
                  <WifiOff className="mx-auto mb-4 h-16 w-16 text-red-500" />

                  <h3 className="text-2xl font-semibold">
                    Unable to complete request
                  </h3>

                  <p className="mt-4 text-gray-600">
                    We couldn't communicate with the
                    server right now.
                  </p>

                  <p className="mt-2 text-gray-600">
                    Please try again later.
                  </p>
                </div>
              )}

              {isDev && (
                <div className="space-y-4">
                  {requestUrl && (
                    <div>
                      <h3 className="mb-2 font-semibold">
                        URL
                      </h3>

                      <pre className="overflow-auto rounded-lg bg-gray-100 p-3 text-sm">
                        {requestUrl}
                      </pre>
                    </div>
                  )}

                  <div>
                    <h3 className="mb-2 font-semibold">
                      Status
                    </h3>

                    <pre className="rounded-lg bg-gray-100 p-3 text-sm">
                      {error.status}
                    </pre>
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold">
                      Message
                    </h3>

                    <pre className="rounded-lg bg-gray-100 p-3 text-sm">
                      {error.message}
                    </pre>
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold">
                      Response Data
                    </h3>

                    <pre className="max-h-72 overflow-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
                      {JSON.stringify(
                        error.data,
                        null,
                        2,
                      )}
                    </pre>
                  </div>

                  {error.stack && (
                    <div>
                      <h3 className="mb-2 font-semibold">
                        Stack Trace
                      </h3>

                      <pre className="max-h-96 overflow-auto rounded-lg bg-slate-900 p-4 text-sm text-red-300">
                        {error.stack}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* FOOTER */}

        <div className="border-t p-4">
          <div className="flex justify-end gap-3">
            {isApplicationError && (
              <button
                onClick={() =>
                  window.location.reload()
                }
                className="flex items-center gap-2 rounded-md bg-orange-600 px-4 py-2 text-white transition hover:bg-orange-700"
              >
                <RefreshCw size={16} />
                Reload Page
              </button>
            )}

            <button
              onClick={onClose}
              className="rounded-md bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}