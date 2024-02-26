import { http } from "msw";

import { signInResolver } from "./resolvers/signInResolver";

export const handlers = [http.post("https://my.backend/sign-in", signInResolver)];
