import { config } from "@/config";

export const headers: { [key: string]: string } = {
  "x-app-id": config.project,
};

export const getEndpoint = (path: string) => `${config.serverUrl}${path}`;
