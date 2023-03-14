const express = require("express");
const morgan = require("morgan"); // middleware untuk log request
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override"); // metode untuk mengubah method post menjadi put dan delete
const bodyParser = require("body-parser"); // parsing request body form
const session = require("express-session"); // session
const flash = require("connect-flash"); // flash message
const cookieParser = require("cookie-parser"); // parsing cookie
// kebutuhan api
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const app = express();

// module koneksi dari database
// const db = require("./database/conn");

// setting env
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;

// third party middleware
app.use(morgan("dev"));
// kebutuhan api
app.use(cors());
// app.use(helmet());
// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//   })
// );
app.use(compression());

// pemanggilan db
// app.use((req, res, next) => {
//   req.db = db;
//   next();
// });
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// flash message
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
app.use(flash());
app.use(cookieParser("secret"));

// untuk pemanggilan template engine
app.set("view engine", "ejs");
app.use(expressLayouts);
// serving static file
// app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));

// deklarasi router
const homeRouter = require("./routers/home");
const basicRouter = require("./routers/basic");
const contactRouter = require("./routers/contact");
// api router
const contactApiRouter = require("./routers/contactApi");

// middleware (req, res, cb)
app.use((req, res, next) => {
  console.log("ini middleware pertama");
  res.locals.message = req.flash();
  console.log("Time", Date.now());
  next();
});

// gunakan router
app.use("/", homeRouter);
app.use("/basic", basicRouter);
app.use("/contacts", contactRouter);
// api router
app.use("/api/contacts", contactApiRouter);

// Error handling
app.use((err, req, res, next) => {
  res.json({
    message: err.message,
    error: err,
  });
});

// handle 404
app.use((req, res) => {
  res.status(404).send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
