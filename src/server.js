import express from "express";
import path from "path";
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render(path.join(`${__dirname}/views/index`));
});

app.listen(process.env.PORT || 1337);
