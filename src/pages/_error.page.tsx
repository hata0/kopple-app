import Custom401 from "./401.page";
import Custom500 from "./500.page";

import { HttpErrorObject } from "@/utils/HttpError";

export default function Error({ http }: HttpErrorObject) {
  if (http.status === 401) {
    return <Custom401 />;
  } else {
    return <Custom500 />;
  }
}
