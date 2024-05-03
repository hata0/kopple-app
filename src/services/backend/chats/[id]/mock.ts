import { HttpResponse } from "msw";

import { path as createPath } from ".";

import { httpHandlerFactory } from "@/lib/msw/httpHandlerFactory";
import { chatContents } from "@/mocks/chatContents";

const path = createPath(":id");

export const getChatHandler = httpHandlerFactory("get", path, () => {
  return HttpResponse.json(chatContents());
});
