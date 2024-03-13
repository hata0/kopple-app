import { useCallback } from "react";
import useSWR from "swr";

import { ProfileContent } from "../types/ProfileContent";

import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { MOCK_API_URL } from "@/constants/mockApiUrl";
import { fetcherWithAuth } from "@/utils/fetcherWithAuth";

export const useProfile = (id: string) => {
  const { data: profileContent, mutate } = useSWR<ProfileContent>(`/profiles/${id}`);

  const fetchProfile = useCallback(async () => {
    const { error, res } = await fetcherWithAuth(`${MOCK_API_URL}/profiles/${id}`);

    if (error) {
      toast({
        action: (
          <ToastAction altText="再取得" onClick={() => void fetchProfile()}>
            再取得
          </ToastAction>
        ),
        title: "プロフィールデータの取得に失敗しました。",
        variant: "destructive",
      });
    } else if (res?.status === 401) {
      toast({
        title: "ログインできていません",
        variant: "destructive",
      });
    } else {
      const data = (await res?.json()) as ProfileContent;
      await mutate(data, false);
    }
  }, [id, mutate]);

  return { fetchProfile, profileContent };
};
