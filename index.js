const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;

app.use(morgan("combined"));

//route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// 127.0.0.1 - localhost:3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
