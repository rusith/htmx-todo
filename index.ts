import { app } from "./app";
import todoHandlers from "handlers/todo";

todoHandlers.forEach(handler => handler());

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
