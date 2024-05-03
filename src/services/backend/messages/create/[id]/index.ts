import { MOCK_API_URL } from "@/constants/mockApiUrl";
import { CreateMessageRequest } from "@/features/chat/types/CreateMessage";
import { fetcher } from "@/utils/fetcher";

export const path = (id: string) => `${MOCK_API_URL}/messages/create/${id}`;

export const postMessage = (id: string, message: string) =>
  fetcher<CreateMessageRequest>(path(id), {
    body: {
      message,
    },
    method: "POST",
  });
