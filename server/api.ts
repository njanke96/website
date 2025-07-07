import { Hono } from "hono";

const api = new Hono();

api.get("/", (c) => c.text("Placeholder for any server-side stuff"));

export default api;
