import { Custom401 } from "../401";
import { Custom500 } from "../500";

import { HttpErrorObject } from "@/utils/HttpError";

export const Error = ({ http }: HttpErrorObject) => {
  if (http.status === 401) {
    return <Custom401 />;
  } else {
    return <Custom500 />;
  }
};
