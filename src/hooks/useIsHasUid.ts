import { parseCookies } from "nookies";

import { useIsClient } from "@/hooks/useIsClient";

export const useIsHasUid = () => {
  const { isClient } = useIsClient();

  if (isClient) {
    const cookies = parseCookies();
    return { isHasUid: !!cookies.uid };
  }
  return { isHasUid: false };
};
