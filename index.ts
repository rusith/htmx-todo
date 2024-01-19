import express from "express";
import { engine, create } from "express-handlebars";
import bodyParser from "body-parser";

const app = express();

const c = create({
  helpers: {},
});

app.engine("handlebars", c.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(bodyParser.urlencoded());

let todos = [
  {
    id: 1,
    title: "Some",
  },
  {
    id: 2,
    title: "DO that",
  },
];

app.get("/", (req, res) => {
  res.render("home", { todos });
});

app.get("/edit-todo/:id", (req, res) => {
  const todo = todos.find(todo => todo.id === Number(req.params.id));
  res.render("partials/components/todo-modal", { todo, layout: false });
});

app.post("/update-todo/:id", (req, res) => {
  const todo = todos.find(todo => todo.id === Number(req.params.id));
  if (todo) {
    todo.title = req.body.title;
  }

  res.render("partials/components/update-todo", {
    todos,
    layout: false,
  });
});

app.delete("/delete-todo/:id", (req, res) => {
  todos = todos.filter(todo => todo.id !== Number(req.params.id));
  res.status(200);
  res.send('true');
});

app.listen(3000);
