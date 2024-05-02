import { ProfileFormInput } from "./type";

import { MOCK_API_URL } from "@/constants/mockApiUrl";
import { fetcher } from "@/utils/fetcher";

export * from "./schema";
export * from "./type";

export const path = (uid: string) => `${MOCK_API_URL}/profiles/${uid}`;

export const getProfile = (uid: string) => fetcher(path(uid));

export const postProfile = (uid: string, { image, ...data }: ProfileFormInput) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(data));
  if (image) {
    formData.append("image", new Blob([image], { type: image?.type }));
  }

  return fetch(path(uid), {
    body: formData,
    method: "POST",
  });
};
