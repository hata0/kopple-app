import { DashboardHeader } from "@/components/layouts/domain/DashboardHeader";
import { PortraitCarousel } from "@/features/dashboard/PortraitCarousel";

export default function DashboardPage() {
  return (
    <div>
      <DashboardHeader />
      <PortraitCarousel />
    </div>
  );
}
