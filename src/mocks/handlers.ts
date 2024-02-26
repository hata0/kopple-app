import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://my.backend/book", () => {
    return HttpResponse.json({
      description:
        "The Lord of the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien.",
      title: "Lord of the Rings",
    });
  }),
];
