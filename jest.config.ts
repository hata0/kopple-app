import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coveragePathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/src/components/shadcn/"],
  coverageProvider: "v8",
  preset: "ts-jest/presets/js-with-ts-esm",
  setupFiles: ["<rootDir>/jest.polyfills.ts"],
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
// export default createJestConfig(config);

// transformIgnorePatternsが機能するようにmodule.exportsする
module.exports = async () => ({
  ...(await createJestConfig(config)()),
  transformIgnorePatterns: ["node_modules/(?!(firebase|@firebase))"],
});
