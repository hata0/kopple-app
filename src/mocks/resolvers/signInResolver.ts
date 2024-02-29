import { HttpResponse, HttpResponseResolver, PathParams } from "msw";

import { Account, SuccessResponse } from "@/features/sign-in/types/SignIn";
import { ErrorResponse } from "@/types/ErrorResponse";

const user: Account = {
  email: "user@example.com",
  password: "password1",
};

export const signInResolver: HttpResponseResolver<
  PathParams,
  Account,
  SuccessResponse | ErrorResponse
> = async ({ request }) => {
  const data = await request.json();

  if (user.email === data.email && user.password === data.password) {
    return HttpResponse.json({
      message: "Login successful",
    });
  } else {
    return HttpResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }
};
