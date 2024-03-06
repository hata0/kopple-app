import { useEffect, useState } from "react";

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const func = () => {
      const pos = window.innerHeight + window.scrollY;
      setScrollPosition(pos);
    };
    window.addEventListener("scroll", func);
    return () => window.removeEventListener("scroll", func);
  }, []);

  return { scrollPosition };
};
