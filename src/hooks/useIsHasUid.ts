import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

export const useIsHasUid = () => {
  const [isHasUid, setIsHasUid] = useState(false);

  useEffect(() => {
    const cookies = parseCookies();
    setIsHasUid(!!cookies.uid);
  }, []);

  return { isHasUid };
};
