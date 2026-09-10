import "@/App.css";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { useAuth } from "@/app/providers/AuthProvider/AuthProvider";
import MainRouter from "@/app/router/route";
import GlobalLoader from "@/shared/components/GlobalLoader/GlobalLoader";
import { useLoading } from "@/app/providers/LoadingProvider/LoadingProvider";
import { UserProfileProvider } from "./providers/UserProvider/UserProvider";

function App() {
  const { isLoading } = useAuth();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    if (isLoading) {
      showLoading("Verifying your credentials...");
    } else {
      hideLoading();
    }
  }, [isLoading, showLoading, hideLoading]);

  return (
    <BrowserRouter>
      <UserProfileProvider>
        <GlobalLoader />
        <MainRouter />
      </UserProfileProvider>
    </BrowserRouter>
  );
}

export default App;
