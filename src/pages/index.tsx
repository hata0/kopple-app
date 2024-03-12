import { PreLoginHeader } from "@/components/layouts/domain/PreLoginHeader";
import { useAuthContext } from "@/providers/AuthProvider";

export default function TopPage() {
  const { user } = useAuthContext();
  console.log(user);

  return (
    <div>
      <PreLoginHeader />
      <div>トップページ</div>
      <div>トップページの説明</div>
    </div>
  );
}
