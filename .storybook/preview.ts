import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";
import { decorator } from "./mocks/firebaseAuth";
import { initialize, mswLoader } from "msw-storybook-addon";
import { fn } from "@storybook/test";

initialize({ onUnhandledRequest: "bypass" });

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    firebaseAuth: {
      credential: {
        user: {
          getIdToken: fn().mockResolvedValue("id-token"),
          uid: "uid",
        },
      },
    },
  },
  decorators: [decorator],
  loaders: [mswLoader],
};

export default preview;
