import { z } from "zod";

import { signInInputSchema } from "./schema";

export type SignInInput = z.infer<typeof signInInputSchema>;
