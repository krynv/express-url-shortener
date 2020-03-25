import express from "express";
import path from "path";
import mongoose from "mongoose";
import shortURL from "./models/shortURL";

const app = express();
mongoose.connect("mongodb://localhost/urlShortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const shortURLs = await shortURL.find();
  res.render(`${__dirname}/views/index`, { shortURLs: shortURLs });
});

app.post("/shortenURL", async (req, res) => {
  await shortURL.create({ full: req.body.fullURL });
  res.redirect("/");
});

app.listen(process.env.PORT || 1337);
