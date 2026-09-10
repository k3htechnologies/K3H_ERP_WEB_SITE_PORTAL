import { LocalStorageHelper } from "@/shared/utils/localStorageHelper";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface SelectedProject {
  id: string;
  name: string;
}

interface ChannelPartnerContextType {
  selectedProject: SelectedProject | null;
  setSelectedProject: (project: SelectedProject | null) => void;
  clearSelectedProject: () => void;
}

const ChannelPartnerContext = createContext<ChannelPartnerContextType | null>(
  null,
);

interface ChannelPartnerProviderProps {
  children: ReactNode;
}

export const ChannelPartnerProvider = ({
  children,
}: ChannelPartnerProviderProps) => {
  const [selectedProject, setSelectedProjectState] =
    useState<SelectedProject | null>(() => {
      try {
        const storedProject = LocalStorageHelper.getSelectedProject();
        if (!storedProject) {
          return null;
        }
        return storedProject;
      } catch (error) {
        console.error(
          "Failed to restore selected project from localStorage",
          error,
        );
        return null;
      }
    });

  useEffect(() => {
    try {
      if (selectedProject) {
        LocalStorageHelper.storeSelectedProject(selectedProject);
      } else {
        LocalStorageHelper.removeSelectedProject();
      }
    } catch (error) {
      console.error(
        "Failed to persist selected project to localStorage",
        error,
      );
    }
  }, [selectedProject]);

  const setSelectedProject = (project: SelectedProject | null) => {
    setSelectedProjectState(project);
  };

  const clearSelectedProject = () => {
    setSelectedProjectState(null);
  };

  const value = useMemo(
    () => ({
      selectedProject,
      setSelectedProject,
      clearSelectedProject,
    }),
    [selectedProject],
  );

  return (
    <ChannelPartnerContext.Provider value={value}>
      {children}
    </ChannelPartnerContext.Provider>
  );
};

export const useChannelPartnerContext = () => {
  const context = useContext(ChannelPartnerContext);

  if (!context) {
    throw new Error(
      "useChannelPartnerContext must be used within ChannelPartnerProvider",
    );
  }

  return context;
};
