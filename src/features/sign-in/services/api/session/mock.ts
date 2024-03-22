import { HttpResponse } from "msw";

import { path } from ".";

import { httpHandlerFactory } from "@/lib/mocks/httpHandlerFactory";

export const getSessionHandler = httpHandlerFactory("get", path(), () =>
  HttpResponse.json({
    message: "セッションを作成しました",
  }),
);
