"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserSchema_1 = require("../../Models/UserSchema");
const uuid_1 = require("uuid");
const jsonwebtoken_1 = require("jsonwebtoken");
class UserManager {
    constructor() {
        this.ID = new Date().getTime();
        // login: string = null;
        // mail: string = null;
        // password: string = null;
        this.User = null;
        this.User = UserSchema_1.default;
    }
    ////////////////////////////
    //////////////////////////// Методы для нахождения пользователя
    ////////////////////////////
    _findUserFromLogin(login) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.User.findOne({ login: login }, (err, result) => {
                if (err)
                    throw new Error(err);
                return result;
            });
        });
    }
    _findUserFromId(ID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.User.findOne({ ID: ID }, (err, result) => {
                if (err)
                    throw new Error(err);
                return result;
            });
        });
    }
    _findUserFromMail(mail) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.User.findOne({ mail: mail }, (err, result) => {
                if (err)
                    throw new Error(err);
                return result;
            });
        });
    }
    ////////////////////////////
    //////////////////////////// Регистрация
    ////////////////////////////
    register(login, mail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let newUser = new this.User({
                ID: this.ID,
                login: login,
                mail: mail,
                password: password
            });
            let mailChecking = yield this._findUserFromMail(newUser.mail);
            let loginChecking = yield this._findUserFromLogin(newUser.login);
            if (mailChecking) {
                console.log('mail error');
                return {
                    code: 301,
                    status: 'Failed',
                    msg: 'Пользователь с такой почтой уже существует',
                    id: null
                };
            }
            if (loginChecking) {
                console.log('login error');
                return {
                    code: 302,
                    status: 'Failed',
                    msg: 'Пользователь с таким логином уже существует',
                    id: null
                };
            }
            yield newUser.save();
            return {
                code: 200,
                status: 'Ok',
                msg: 'Пользователь успешно создан',
                id: this.ID
            };
        });
    }
    ////////////////////////////
    //////////////////////////// Авторизация
    ////////////////////////////
    auth(login, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!!!login || !!!pass) {
                return {
                    code: 404,
                    uid: null,
                    status: 'failed',
                    token: '',
                    refresh_token: '',
                    msg: 'Не передан логин или пароль.'
                };
            }
            let currentUser = yield this._findUserFromLogin(login);
            if (pass.toString() === currentUser.password.toString()) {
                return {
                    code: 404,
                    status: 'ok',
                    token: '',
                    refresh_token: '',
                    uid: currentUser.ID
                };
            }
            else {
                return {
                    code: 404,
                    uid: null,
                    status: 'failed',
                    token: '',
                    refresh_token: '',
                    msg: 'Не верная пара Логин - Пароль'
                };
            }
        });
    }
    login(login, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!!!login || !!!pass) {
                return {
                    code: 400,
                    status: 'failed',
                    uid: null,
                    token: '',
                    refresh_token: '',
                    msg: 'Не передан логин или пароль.'
                };
            }
            let currentUser = yield this._findUserFromLogin(login);
            const refreshToken = uuid_1.default();
            if (!currentUser || pass.toString() !== currentUser.password.toString()) {
                return {
                    code: 400,
                    status: 'failed',
                    uid: null,
                    token: '',
                    refresh_token: '',
                    msg: 'Не верная пара Логин - Пароль'
                };
            }
            else {
                return {
                    code: 200,
                    status: 'ok',
                    token: jsonwebtoken_1.default.sign({ id: currentUser.ID }, 'VERYSECRETKEY'),
                    refresh_token: refreshToken,
                    uid: currentUser.ID
                };
            }
        });
    }
}
exports.default = UserManager;
//# sourceMappingURL=UserManager.js.map