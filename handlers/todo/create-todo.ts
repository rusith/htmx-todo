import { getTodos } from "data";
import { post } from "helpers/handler";

const handler = () =>
  post("/todos", ({ renderPartial }, req) => {
    const todos = getTodos();
    const last = todos.at(todos.length - 1);
    todos.push({ id: (last?.id || 0) + 1, title: req.body.title });

    return renderPartial("components/create-todo", {
      todos,
    });
  });

export default handler;
