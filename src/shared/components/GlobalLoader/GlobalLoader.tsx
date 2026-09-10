import loaderGif from "@/assets/loader.gif";

import { useLoading } from "@/app/providers/LoadingProvider/LoadingProvider";

const GlobalLoader = () => {
  const { visible, message } = useLoading();

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-100">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center space-y-4 min-w-75 shadow-lg">
        <div className="flex flex-col items-center space-y-3">
          <img src={loaderGif} alt="Loading..." className="h-10 w-10" />
          <p className="text-gray-600 text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default GlobalLoader;
