import "@testing-library/jest-dom";
import { randomUUID } from "node:crypto";

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock("next/router", () => require("next-router-mock"));

if (typeof window !== "undefined") {
  window.crypto.randomUUID = randomUUID;
}
