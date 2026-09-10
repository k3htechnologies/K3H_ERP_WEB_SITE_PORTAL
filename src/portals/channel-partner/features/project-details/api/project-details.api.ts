export const ProjectDetailsApi = {
  PULL_PROJECT_DETAILS: (projectId: string): string =>
    `/ChannelPartner/projects/${projectId}/project-details`,
};

export type ProjectDetailsApiKeys = keyof typeof ProjectDetailsApi;
