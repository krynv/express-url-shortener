import express from "express";
import path from "path";
import mongoose from "mongoose";
import ShortURL from "./models/shortURL";

const app = express();
mongoose.connect("mongodb://localhost/urlShortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const shortURLs = await ShortURL.find();
  res.render(`${__dirname}/views/index`, { shortURLs: shortURLs });
});

app.post("/shortenURL", async (req, res) => {
  await ShortURL.create({ full: req.body.fullURL });
  res.redirect("/");
});

app.get("/:shortURL", async (req, res) => {
  const shortURL = await ShortURL.findOne({ short: req.params.shortURL });
  if (shortURL == null) return res.sendStatus;

  shortURL.clicks++;
  shortURL.save();

  res.redirect(shortURL.full);
});

app.listen(process.env.PORT || 1337);
