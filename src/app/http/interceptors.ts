import { isDevelopment } from "@/app/config";
import { apiClient } from "@/app/http/api-client";

export const registerInterceptors = () => {
  apiClient.addRequestInterceptor((config) => {
    const token = localStorage.getItem("auth_token");
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  apiClient.addRequestInterceptor((config) => {
    if (isDevelopment()) {
      console.log(`[API] ${config.method} ${config.url}`);
    }
    return config;
  });

  apiClient.addResponseInterceptor(async (response) => {
    if (isDevelopment()) {
      console.log(`[API] Response ${response.status} for ${response.url}`);
    }
    return response;
  });

  apiClient.addResponseInterceptor(async (response) => {
    if (response.status === 401) {
      localStorage.removeItem("auth_token");
      // window.location.href = '/login';
    }

    return response;
  });
};
