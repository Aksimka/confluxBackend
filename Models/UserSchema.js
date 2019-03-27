"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let UserSchema = new Schema({
    ID: { type: String },
    login: { type: String },
    mail: { type: String },
    password: { type: String }
});
const User = mongoose.model('User', UserSchema);
exports.default = User;
//# sourceMappingURL=UserSchema.js.map