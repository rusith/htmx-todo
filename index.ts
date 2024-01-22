import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";

const app = express();


app.engine("hbs", engine({ extname: '.hbs'}));
app.set("view engine", "hbs");
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

app.get("/add-todo", (req, res) => {
  res.render("partials/components/todo-modal", { layout: false });
});

app.post("/update-todo/:id", (req, res) => {
  const todo = todos.find(todo => todo.id === Number(req.params.id));
  if (todo) {
    todo.title = req.body.title;
  }

  res.render("partials/components/update-todo", {
    todo,
    layout: false,
  });
});

app.delete("/delete-todo/:id", (req, res) => {
  todos = todos.filter(todo => todo.id !== Number(req.params.id));
  res.status(200);
  res.send("true");
});

app.post("/create-todo", (req, res) => {
  const last = todos.at(todos.length - 1);
  todos.push({ id: (last?.id || 0) + 1, title: req.body.title });

  res.render("partials/components/create-todo", {
    todos,
    layout: false,
  });
});

app.listen(3000);
