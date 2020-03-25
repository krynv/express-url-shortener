import express from "express";
import path from "path";
import mongoose from "mongoose";
import shortURLSchema from "./models/shortURL";

const app = express();
mongoose.connect("mongodb://localhost/urlShortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render(path.join(`${__dirname}/views/index`));
});

app.post("/shortenURL", async (req, res) => {
  await shortURLSchema.create({ full: req.body.fullURL });
  res.redirect("/");
});

app.listen(process.env.PORT || 1337);
