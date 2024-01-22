import { getTodos } from "data";
import { get } from "helpers/handler";

const handler = () =>
  get("/todos/:id/edit", async ({ renderPartial }, req) => {
    const todo = getTodos().find(todo => todo.id === Number(req.params.id));
    await renderPartial("components/todo-modal", { todo });
  });

export default handler;
