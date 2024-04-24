import { StoryFn } from "@storybook/react";
import { destroyCookie, setCookie } from "nookies";
import { useEffect } from "react";

import { uidCookieMock } from "../../mocks/mockCookies";

export const SetUidDecorator = (Story: StoryFn) => {
  const { name, value } = uidCookieMock;

  useEffect(() => {
    setCookie(null, name, value, {
      maxAge: 60 * 60 * 24 * 5,
      path: "/",
      sameSite: "lax",
      secure: true,
    });

    return () => {
      destroyCookie(null, name);
    };
  }, [name, value]);

  return <Story />;
};
