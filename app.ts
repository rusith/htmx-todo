import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";

export const app = express();

app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(bodyParser.urlencoded());