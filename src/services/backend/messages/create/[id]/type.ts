import { z } from "zod";

import { chatInputSchema } from "./schema";

export type ChatInput = z.infer<typeof chatInputSchema>;
