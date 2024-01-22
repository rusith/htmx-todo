import { getTodos, setTodos } from "data";
import { del } from "helpers/handler";

const handler = () =>
  del("/todos/:id", async (_, req, res) => {
    setTodos(getTodos().filter(todo => todo.id !== Number(req.params.id)));
    res.status(200);
    res.send("true");
  });

export default handler;