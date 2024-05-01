import { useRouter } from "next/router";

import { Custom500 } from "../500";

import { toast } from "@/components/shadcn/ui/use-toast";

type Props = {
  status: number;
};
export const Error = ({ status }: Props) => {
  const router = useRouter();

  if (status === 401) {
    toast({
      title: "再度ログインしてください",
      variant: "destructive",
    });
    if (typeof window !== "undefined") {
      void router.replace("/sign-in");
    }
  } else {
    return <Custom500 />;
  }
};
