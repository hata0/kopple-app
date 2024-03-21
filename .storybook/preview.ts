import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";
import { decorator } from "./mocks/firebaseAuth";

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
};

export default preview;
