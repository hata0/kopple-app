import { StoryFn } from "@storybook/react";
import { destroyCookie, setCookie } from "nookies";
import { useEffect } from "react";

export const SessionDecorator = (Story: StoryFn) => {
  useEffect(() => {
    setCookie(null, "session", "session-value", {
      maxAge: 60 * 60 * 24 * 5,
      path: "/",
      sameSite: "lax",
      secure: true,
    });

    return () => {
      destroyCookie(null, "session");
    };
  }, []);

  return <Story />;
};
