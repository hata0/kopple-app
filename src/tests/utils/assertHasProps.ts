import { GetServerSidePropsResult } from "next";

import { AssertsError } from "@/lib/asserts";

export function assertHasProps<T>(res: GetServerSidePropsResult<T>): asserts res is { props: T } {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  const hasProps = typeof res === "object" && typeof (res as any).props === "object";
  if (!hasProps) throw new AssertsError("no props");
}
