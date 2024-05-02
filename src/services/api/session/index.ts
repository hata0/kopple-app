import { API_ROUTE_URL } from "@/constants/apiRouteUrl";
import { fetcher } from "@/utils/fetcher";

export * from "./schema";
export * from "./type";

export const path = () => `${API_ROUTE_URL}/session`;

export const getSession = (idToken: string) =>
  fetcher(path(), {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

export const deleteSession = () =>
  fetcher(path(), {
    method: "DELETE",
  });
