import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";
import { decorator } from "./mocks/firebaseAuth";
import { initialize, mswLoader } from "msw-storybook-addon";

initialize();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [decorator],
  loaders: [mswLoader],
};

export default preview;
