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
class FindUserService {
    static findUserFromLogin(login) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserSchema_1.default.findOne({ login }, (err, result) => {
                if (err)
                    throw new Error(err);
                return result;
            });
        });
    }
    static findUserFromId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserSchema_1.default.findOne({ id }, (err, result) => {
                if (err)
                    throw new Error(err);
                return result;
            });
        });
    }
    static findUserFromMail(mail) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserSchema_1.default.findOne({ mail }, (err, result) => {
                if (err)
                    throw new Error(err);
                return result;
            });
        });
    }
}
exports.default = FindUserService;
//# sourceMappingURL=FindUserService.js.map