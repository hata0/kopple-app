import { NextApiRequest, NextApiResponse } from "next";
import { createRequest, createResponse, RequestOptions, ResponseOptions } from "node-mocks-http";

export const apiHandlerArgs = (options?: {
  reqOptions?: RequestOptions;
  resOptions?: ResponseOptions;
}) => {
  const req = createRequest(options?.reqOptions);
  const res = createResponse(options?.resOptions);
  return [req, res] as unknown as [
    NextApiRequest & ReturnType<typeof createRequest>,
    NextApiResponse & ReturnType<typeof createResponse>,
  ];
};
