import { HttpResponse } from "msw";

import { path as createPath } from ".";

import { CreateMessageRequest } from "@/features/chat/types/CreateMessage";
import { httpHandlerFactory } from "@/lib/msw/httpHandlerFactory";
import { message as createMessage } from "@/mocks/message";

const path = createPath(":id");

export const postMessageHandler = httpHandlerFactory("post", path, async ({ request }) => {
  const { message } = (await request.json()) as CreateMessageRequest;
  return HttpResponse.json(createMessage(message));
});
