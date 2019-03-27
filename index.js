"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express_1 = require("express");
const router = express_1.Router();
const userRouter_1 = require("./Router/userRouter");
const authRouter_1 = require("./Router/authRouter");
const appRouter_1 = require("./Router/appRouter");
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/conflux', { useNewUrlParser: true }).then((res) => {
    console.log('Connection is successful');
}).catch((e) => {
    throw new Error(e);
});
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', appRouter_1.default);
app.use('/auth', authRouter_1.default);
app.use('/user', userRouter_1.default);
app.listen(3000, () => {
    console.log('App listening on 3000 port!');
});
//# sourceMappingURL=index.js.map