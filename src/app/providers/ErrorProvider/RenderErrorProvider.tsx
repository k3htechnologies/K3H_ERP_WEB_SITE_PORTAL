import { ErrorBoundary } from "@/shared/components/error/ErrorBoundary";

export function RenderErrorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
}