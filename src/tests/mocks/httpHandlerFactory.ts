import { http, HttpResponse, HttpResponseResolver } from "msw";

type HandlerFactoryArgs = {
  isNetworkError?: boolean;
  error?: {
    message: string;
    status: number;
  };
};

export const httpHandlerFactory = (
  method: keyof typeof http,
  path: string,
  resolver: HttpResponseResolver,
) => {
  return (args?: HandlerFactoryArgs) => {
    if (!args) {
      return http[method](path, resolver);
    }
    const { error, isNetworkError } = args;

    if (isNetworkError) {
      return http[method](path, () => {
        return HttpResponse.error();
      });
    } else if (error) {
      return http[method](path, () => {
        return HttpResponse.json(
          {
            error: error.message,
          },
          {
            status: error.status,
          },
        );
      });
    } else {
      return http[method](path, resolver);
    }
  };
};
