import { parseCookies } from "nookies";

import { useIsClient } from "@/hooks/useIsClient";

export const useIsHasSession = () => {
  const { isClient } = useIsClient();

  if (isClient) {
    const cookies = parseCookies();
    return { isHasSession: !!cookies.session };
  }
  return { isHasSession: false };
};
