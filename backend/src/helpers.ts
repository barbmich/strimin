import got, { HTTPError, Options, type Hooks } from "got";
import { HTTPException } from "hono/http-exception";
import type { ContentfulStatusCode } from "hono/utils/http-status";

export function errorHandler(error: unknown): Response {
  let httpException: HTTPException;
  if (error instanceof HTTPError) {
    console.log(error.request.requestUrl);
    const status = error.response?.statusCode ?? 500;
    httpException = new HTTPException(status as ContentfulStatusCode, {
      message: error.message,
    });
  } else {
    httpException = new HTTPException(500, {
      message: "Internal Server Error",
    });
  }

  return httpException.getResponse();
}

type HTTPClientOptions = {
  prefixUrl: Options["prefixUrl"];
  beforeRequest?: Hooks["beforeRequest"][number];
};

export function getHttpClient({
  prefixUrl,
  beforeRequest = () => {},
}: HTTPClientOptions) {
  return got.extend({
    prefixUrl,
    headers: {
      Accept: "application/json",
    },
    timeout: {
      request: 3000,
    },
    responseType: "json",
    retry: { limit: 2 },
    hooks: {
      beforeRequest: [beforeRequest],
    },
  });
}
