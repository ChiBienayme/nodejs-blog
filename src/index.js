const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const handlebars = require("express-handlebars").engine;
const path = require("path");

const app = express();
const port = 3000;

const route = require("./routes");

const db = require("./config/db");
//Connect to DB
db.connect();

// app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(__dirname + "/public"));

//middleware
//send from XMHttpRequest, fetch, axios
app.use(
    express.urlencoded({
        extended: true,
    })
);
//send to js to server
app.use(express.json());

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

//middleware
app.use(security);
function security(req, res, next) {
    if (["normalTicket", "VIPTicket"].includes(req.query.ticket)) {
        req.face = "strikethrough";
        return next();
    }
    res.status(403).json({
        message: "Access denied",
    });
}

app.get("/middleware", function (req, res, next) {
    res.json({
        message: "Successfully",
        face: req.face,
    });
});

//HTTP logger
app.use(morgan("combined"));

//Template engine
app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        helpers: {
            sum: (a, b) => a + b,
        },
    })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

//route init
route(app);

// 127.0.0.1 - localhost:3000
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
