"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserManager_1 = require("./../Controller/Managers/UserManager");
const router = express_1.Router();
const currentUserManager = new UserManager_1.default();
router.post('/', (req, res) => {
    console.log('asd');
});
router.post('/registration', (req, res) => {
    console.log(req.body.login, req.body.mail, req.body.pass);
    currentUserManager.register(req.body.login, req.body.mail, req.body.pass).then((response) => {
        res.send(response);
    });
});
router.post('/auth', (req, res) => {
    console.log(req.body.login, req.body.pass);
    currentUserManager.auth(req.body.login, req.body.pass).then((response) => {
        res.send(response);
    });
});
router.post('/login', (req, res) => {
    const { login, password } = req.body;
    currentUserManager.login(login, password).then((response) => {
        res.send(response);
    });
});
exports.default = router;
//# sourceMappingURL=userRouter.js.map