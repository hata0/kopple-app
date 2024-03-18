import { z } from "zod";

import { signInInputSchema } from ".";

export type SignInInput = z.infer<typeof signInInputSchema>;
