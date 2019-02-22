const express = require("express");
const nunjunks = require("nunjucks");

const app = express();

nunjunks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "njk");

app.get("/", (req, res) => {
  return res.render("form");
});

app.get("/major", (req, res) => {
  const { age } = req.query;
  if (!age) return res.redirect("/");
  return res.render("result", { majority: "maior", age });
});
app.get("/minor", (req, res) => {
  const { age } = req.query;
  if (!age) return res.redirect("/");
  return res.render("result", { majority: "menor", age });
});

app.post("/check", (req, res) => {
  const { age } = req.body;
  const major = age >= 18 ? true : false;
  if (major) {
    return res.redirect(`/major?age=${age}`);
  }
  return res.redirect(`/minor?age=${age}`);
});

app.listen(3000, () => {
  console.log(`App is running at ${3000}`);
});
