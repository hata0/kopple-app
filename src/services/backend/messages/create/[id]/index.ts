import { ChatInput } from "./type";

import { MOCK_API_URL } from "@/constants/mockApiUrl";
import { CreateMessageRequest } from "@/features/chat/types/CreateMessage";
import { fetcher } from "@/utils/fetcher";

export * from "./schema";
export * from "./type";

export const path = (id: string) => `${MOCK_API_URL}/messages/create/${id}`;

export const postMessage = (id: string, values: ChatInput) =>
  fetcher<CreateMessageRequest>(path(id), {
    body: values,
    method: "POST",
  });
