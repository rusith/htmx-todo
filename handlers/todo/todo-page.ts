import { getTodos } from "data";
import { get } from "helpers/handler";

const handler = () => get("/", async (helpers, req, res) => {
  await helpers.renderPage("pages/todo", { todos: getTodos() });
});

export default handler;
