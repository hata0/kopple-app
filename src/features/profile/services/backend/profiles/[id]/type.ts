import { z } from "zod";

import { profileFormInputSchema } from "./schema";

export type ProfileFormInput = z.infer<typeof profileFormInputSchema>;
