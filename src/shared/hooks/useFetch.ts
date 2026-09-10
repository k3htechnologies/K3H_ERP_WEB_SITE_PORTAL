import { apiClient } from "@/app/http/api-client";
import { ApiClientError } from "@/app/http/error";
import { RequestManager } from "@/app/http/requestManager";
import type { ApiResponse } from "@/app/http/types";
import { useLoading } from "@/app/providers/LoadingProvider/LoadingProvider";
import { useCallback, useEffect, useRef, useState } from "react";

export function useFetch<T>(
  url: string,
  loadingMessage: string = "Loading...",
) {
  const [data, setData] = useState<ApiResponse<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiClientError | null>(null);

  const requestManager = useRef(new RequestManager());
  const requestId = useRef(crypto.randomUUID());

  const { showLoading, hideLoading } = useLoading();

  const fetchData = useCallback(async () => {
    setLoading(true);
    showLoading(loadingMessage);

    try {
      requestManager.current.cancel(requestId.current);
      requestId.current = crypto.randomUUID();
      const signal = requestManager.current.createController(requestId.current);
      const response = await apiClient.get<T>(url, { signal });
      setData(response);
      setError(null);
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err);
      }
    } finally {
      setLoading(false);
      hideLoading();
    }
  }, [url, loadingMessage, showLoading, hideLoading]);

  useEffect(() => {
    fetchData();

    return () => {
      requestManager.current.cancel(requestId.current);
    };
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}
