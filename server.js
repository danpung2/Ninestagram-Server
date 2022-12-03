const port = process.env.PORT || 3000;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

let corsOptions = {
    origin: "http://localhost:3001"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");

db.sequelize.sync();

require("./router/UserRouter")(app);
require("./router/ArticleRouter")(app);
require("./router/FollowRouter")(app);
require("./router/ReplyRouter")(app);
require("./router/CommentRouter")(app);


app.listen(port, () => console.log(`Listening on port ${port}`));