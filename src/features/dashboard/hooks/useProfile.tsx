import { useCallback } from "react";
import useSWR from "swr";

import { Profile } from "../types/Profile";

import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/constants/backendUrl";
import { fetcherWithAuth } from "@/utils/fetcherWithAuth";

export const useProfile = (id: string) => {
  const { data: profile, mutate } = useSWR<Profile>(`/profiles/${id}`);

  const fetchProfile = useCallback(async () => {
    const { error, res } = await fetcherWithAuth(`${BACKEND_URL}/profiles/${id}`);

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
        title: "認証に失敗しました。",
        variant: "destructive",
      });
    } else {
      const data = (await res?.json()) as Profile;
      await mutate(data, false);
    }
  }, [id, mutate]);

  return { fetchProfile, profile };
};
