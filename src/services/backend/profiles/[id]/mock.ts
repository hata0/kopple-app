import { HttpResponse } from "msw";

import { path as createPath } from ".";

import { httpHandlerFactory } from "@/lib/msw/httpHandlerFactory";
import { profileContent } from "@/mocks/profileContent";

const path = createPath(":id");

export const getProfileHandler = httpHandlerFactory("get", path, () => {
  return HttpResponse.json(profileContent());
});

export const postProfileHandler = httpHandlerFactory("post", path, () => {
  return HttpResponse.json({
    message: "プロフィールを更新しました",
  });
});
