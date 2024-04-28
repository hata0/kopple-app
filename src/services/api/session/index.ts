import { API_ROUTE_URL } from "@/constants/apiRouteUrl";
import { fetcher } from "@/utils/fetcher";

export const path = () => `${API_ROUTE_URL}/session`;

export const deleteSession = () =>
  fetcher(path(), {
    method: "DELETE",
  });
