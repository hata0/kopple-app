import { HttpResponse } from "msw";

import { path } from ".";

import { httpHandlerFactory } from "@/lib/msw/httpHandlerFactory";

export const postProfileHandler = httpHandlerFactory("post", path(":id"), () => {
  return HttpResponse.json({
    message: "プロフィールを更新しました",
  });
});
