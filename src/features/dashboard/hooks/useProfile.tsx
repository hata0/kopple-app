import { useCallback } from "react";
import useSWR from "swr";

import { Profile } from "../types/Profile";

import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/constants/backendUrl";
import { fetcher } from "@/utils/fetcher";

export const useProfile = (current: number) => {
  const { data: profile, mutate } = useSWR<Profile>(`/user/profile/${current}`);

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
      const data = (await res?.json()) as Profile;
      await mutate(data);
    }
  }, [current, mutate]);

  return { fetchProfile, profile };
};
