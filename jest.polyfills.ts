const { TextDecoder, TextEncoder } = require("node:util");

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
});

const { ReadableStream } = require("node:stream/web");
Object.defineProperties(globalThis, {
  ReadableStream: { value: ReadableStream },
});

const { Blob, File } = require("node:buffer");
const { fetch, FormData, Headers, Request, Response } = require("undici");

Object.defineProperties(globalThis, {
  Blob: { value: Blob },
  fetch: { value: fetch, writable: true },
  File: { value: File },
  FormData: { value: FormData },
  Headers: { value: Headers },
  Request: { value: Request },
  Response: { value: Response },
});
