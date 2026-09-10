import { useEffect } from "react";

export const useScrollMainContent = () => {
  useEffect(() => {
    const mainContentDiv = document.getElementById("main-content");
    mainContentDiv?.scroll(0, 0);
  }, []);
};
