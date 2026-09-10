import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface LoadingContextType {
  showLoading: (message?: string) => void;
  hideLoading: () => void;
  updateMessage: (message: string) => void;
  runWithLoader: <T>(
    callback: () => Promise<T>,
    message?: string,
  ) => Promise<T>;
  visible: boolean;
  message: string;
}

const LoadingContext = createContext<LoadingContextType | null>(null);

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("Loading...");

  const showLoading = useCallback((newMessage = "Loading...") => {
    setMessage(newMessage);
    setVisible(true);
  }, []);

  const hideLoading = useCallback(() => {
    setVisible(false);
  }, []);

  const updateMessage = useCallback((newMessage: string) => {
    setMessage(newMessage);
  }, []);

  const runWithLoader = useCallback(
    async <T,>(
      callback: () => Promise<T>,
      loadingMessage = "Loading...",
    ): Promise<T> => {
      try {
        showLoading(loadingMessage);
        return await callback();
      } catch (error) {
      console.log("RUN WITH LOADER ERROR", error);
      throw error;
    }finally {
        hideLoading();
      }
    },
    [showLoading, hideLoading],
  );

  const value = useMemo(
    () => ({
      visible,
      message,
      showLoading,
      hideLoading,
      updateMessage,
      runWithLoader,
    }),
    [visible, message, showLoading, hideLoading, updateMessage, runWithLoader],
  );

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoadingContext must be used inside LoadingProvider");
  }

  return context;
};
