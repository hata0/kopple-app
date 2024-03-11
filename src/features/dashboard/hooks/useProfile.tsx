import { useCallback } from "react";
import useSWR from "swr";

import { ProfileContent } from "../types/ProfileContent";

import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/constants/backendUrl";
import { fetcher } from "@/utils/fetcher";

export const useProfile = (current: number) => {
  const { data: profileContent, mutate } = useSWR<ProfileContent>(`/user/profile/${current}`);

  const fetchProfile = useCallback(async () => {
    const { error, res } = await fetcher(`${BACKEND_URL}/user/profile/${current}`);

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
    } else {
      const data = (await res?.json()) as ProfileContent;
      await mutate(data);
    }
  }, [current, mutate]);

  return { fetchProfile, profileContent };
};
