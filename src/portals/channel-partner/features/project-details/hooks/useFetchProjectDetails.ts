import { useFetch } from "@/shared/hooks/useFetch";
import { ProjectDetailsApi } from "../api/project-details.api";
import type { ProjectDetailsResponse } from "../api/project-details.response";

export const useFetchProjectDetails = (projectId: string = "") => {
  return useFetch<ProjectDetailsResponse>(
    `${ProjectDetailsApi.PULL_PROJECT_DETAILS(projectId)}`,
    "Fetching Project Details",
  );
};
