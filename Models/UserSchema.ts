import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    ID: {type: String},
    login: {type: String},
    mail: {type: String},
    password: {type: String}
});

const User = mongoose.model('User', UserSchema);

export default User;