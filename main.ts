import { Hono } from "hono";
import { serveStatic } from "hono/deno";

import api from "./server/api.ts";

const app = new Hono();

app.route("/api", api);

app.use(
  "*",
  serveStatic({
    root: "./_site/",
  }),
);

Deno.serve(app.fetch);
