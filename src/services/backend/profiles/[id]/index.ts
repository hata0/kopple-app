import { MOCK_API_URL } from "@/constants/mockApiUrl";
import { fetcher } from "@/utils/fetcher";

export const path = (uid: string) => `${MOCK_API_URL}/profiles/${uid}`;

export const getProfile = (uid: string) => fetcher(path(uid));
