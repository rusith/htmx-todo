import { getTodos } from "data";
import { post, put } from "helpers/handler";

const handler = () =>
  put("/todos/:id", ({ renderPartial }, req) => {
    const todo = getTodos().find(todo => todo.id === Number(req.params.id));

    if (todo) {
      todo.title = req.body.title;
    }

    return renderPartial("components/update-todo", { todo });
  });

export default handler;
