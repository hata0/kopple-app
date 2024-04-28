import { HttpResponse } from "msw";

import { path } from ".";

import { httpHandlerFactory } from "@/lib/msw/httpHandlerFactory";

export const deleteSessionHandler = httpHandlerFactory("delete", path(), () => {
  return HttpResponse.json({
    message: "セッションの削除に成功しました。",
  });
});
