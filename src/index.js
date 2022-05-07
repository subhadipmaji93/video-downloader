const express = require("express");
const route = require("./routes/routes");
const exphbs = require("express-handlebars");
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "index",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials"
  })
);

app.get("/", (req, res) => res.render("main"));
app.use("/dl", route);

app.listen(8000, () => {
  console.log("app running on 8000");
});
