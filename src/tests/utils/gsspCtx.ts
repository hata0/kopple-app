import { GetServerSidePropsContext } from "next";
import { createRequest, createResponse, RequestOptions, ResponseOptions } from "node-mocks-http";

export const gsspCtx = (
  ctx?: Partial<GetServerSidePropsContext>,
  options?: {
    reqOptions?: RequestOptions;
    resOptions?: ResponseOptions;
  },
) => ({
  params: undefined,
  query: {},
  req: createRequest(options?.reqOptions),
  res: createResponse(options?.resOptions),
  resolvedUrl: "",
  ...ctx,
});
