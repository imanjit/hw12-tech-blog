const path = require("path");
const express = require("express");
const session = require("express-session");
const controllers = require("./controllers");
const expresshbs = require("express-handlebars");

const helpers = require("./utils/helpers");
const sequelize = require("./config/config");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;
const hbs = expresshbs.create({ helpers });

const sess = {
    secret: "Secret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({ db: sequelize })
};

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(controllers);

app.listen(PORT, () => {
    console.log("App listening on port: " + PORT);
    sequelize.sync({ force: false });
});

