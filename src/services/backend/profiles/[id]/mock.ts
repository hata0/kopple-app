import { HttpResponse } from "msw";

import { path } from ".";

import { httpHandlerFactory } from "@/lib/msw/httpHandlerFactory";
import { profileContent } from "@/mocks/profileContent";

export const getProfileHandler = httpHandlerFactory("get", path(":id"), () => {
  return HttpResponse.json(profileContent());
});
