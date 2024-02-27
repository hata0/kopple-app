import { HttpResponse, HttpResponseResolver } from "msw";

export const signUpResolver: HttpResponseResolver = () => {
  return HttpResponse.json({
    message: "Sign up successful",
  });
};
