import { Meta, StoryObj } from "@storybook/react";
import { SWRConfig } from "swr";

import { Props } from "../../getServerSideProps";

import { ChatHeader } from ".";

import { chatContents } from "@/mocks/chatContents";

type T = typeof ChatHeader;
type Story = StoryObj<T>;

export const Default: Story = {};

export default {
  component: ChatHeader,
  decorators: [
    (Story) => (
      <SWRConfig
        value={{ fallback: { "/chats/id": chatContents() } } satisfies Pick<Props, "fallback">}
      >
        <Story />
      </SWRConfig>
    ),
  ],
  parameters: {
    nextjs: {
      router: {
        query: { id: "id" },
      },
    },
  },
  title: "Features/chat/ChatHeader",
} satisfies Meta<T>;
