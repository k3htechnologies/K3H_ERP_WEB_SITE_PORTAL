// app/providers/AppProviders.tsx

import type { ReactNode } from "react";

import { AuthProvider } from "./AuthProvider/AuthProvider";
import { LoadingProvider } from "./LoadingProvider/LoadingProvider";
import { ToastProvider } from "./ToastProvider/ToastProvider";
import { RenderErrorProvider } from "./ErrorProvider/RenderErrorProvider";
import { NetworkErrorProvider } from "./ErrorProvider/NetworkErrorProvider";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <RenderErrorProvider>
      <AuthProvider>
        <LoadingProvider>
          <ToastProvider>
            <NetworkErrorProvider>{children}</NetworkErrorProvider>
          </ToastProvider>
        </LoadingProvider>
      </AuthProvider>
    </RenderErrorProvider>
  );
}
