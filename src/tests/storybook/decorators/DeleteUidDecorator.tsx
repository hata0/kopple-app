import { StoryFn } from "@storybook/react";
import { destroyCookie } from "nookies";
import { useEffect } from "react";

import { uidCookieMock } from "@/tests/mocks/mockCookies";

export const DeleteUidDecorator = (Story: StoryFn) => {
  const { name } = uidCookieMock;

  useEffect(() => {
    destroyCookie(null, name);
  }, [name]);

  return <Story />;
};
