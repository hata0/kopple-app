import { MOCK_API_URL } from "@/constants/mockApiUrl";
import { fetcher } from "@/utils/fetcher";

export const path = (id: string) => `${MOCK_API_URL}/chats/${id}`;

export const getChat = (id: string) => fetcher(path(id));
