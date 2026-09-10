import { useEffect, useState, type ReactNode } from "react";

import { ApiClientError } from "@/app/http/error";
import { globalErrorManager } from "@/app/http/globalErrorManager";
import { NetworkErrorModal } from "@/shared/components/error/NetworkErrorModal";

interface Props {
  children: ReactNode;
}

export function NetworkErrorProvider({ children }: Props) {
  const [error, setError] = useState<ApiClientError | null>(null);
  const [requestUrl, setRequestUrl] = useState<string>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const errorHandler = (error: ApiClientError, requestUrl?: string) => {
      setError(error);
      setRequestUrl(requestUrl);
      setOpen(true);
    };

    globalErrorManager.register(errorHandler);

    const handleWindowError = (event: ErrorEvent) => {
      globalErrorManager.show(
        new ApiClientError(
          0,
          event.message,
          null,
          {
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            stack: event.error?.stack,
          },
          true,
          "application",
        ),
        event.filename,
      );
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      if (!(reason instanceof Error)) {
        return;
      }
      globalErrorManager.show(
        new ApiClientError(
          0,
          reason?.message || "Unhandled Promise Rejection",
          null,
          reason,
          true,
          "application",
        ),
      );
    };

    window.addEventListener("error", handleWindowError);

    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      globalErrorManager.unregister();
      window.removeEventListener("error", handleWindowError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection,
      );
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
    setError(null);
    setRequestUrl(undefined);
    globalErrorManager.close();
  };

  return (
    <>
      {children}
      <NetworkErrorModal
        open={open}
        error={error}
        requestUrl={requestUrl}
        onClose={handleClose}
      />
    </>
  );
}
