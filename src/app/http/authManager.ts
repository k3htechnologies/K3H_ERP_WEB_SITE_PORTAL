import { LocalStorageHelper } from "@/shared/utils/localStorageHelper";
import { config } from "../config";
import { createQueryParams } from "@/shared/utils/createQueryParams";
import type { ApiResponse } from "./types";
import { LoginApi } from "../auth/login/api/login.api";

class AuthManager {
  private refreshPromise: Promise<string> | null = null;

  async refreshAccessToken(): Promise<string> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.performRefresh();

    try {
      return await this.refreshPromise;
    } finally {
      this.refreshPromise = null;
    }
  }

  private async performRefresh(): Promise<string> {
    const userUniqueKey =
      LocalStorageHelper.getStoredEmployeeData()?.UniqueKey ?? "";

    if (!userUniqueKey) {
      throw new Error("No Unique Key found");
    }
    const params = createQueryParams({
      Uniquekey: userUniqueKey,
    });
    const response = await fetch(
      `${config.apiBaseUrl}${LoginApi.REFRESH_TOKEN}?${params.toString()}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      throw new Error("Refresh token expired");
    }
    const data: ApiResponse<string> = await response.json();
    if (data && data.Data?.trim().length) {
      LocalStorageHelper.storeToken(data.Data);
      return data.Data;
    }
    return "";
  }

  logout() {
    LocalStorageHelper.clearLocalStorageData();
    window.location.href = "/login";
  }
}

export const authManager = new AuthManager();
