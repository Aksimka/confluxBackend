import {Document} from "mongoose";
import IUser = Interfaces.IUser
import IUserManager = Interfaces.IUserManager
import * as mongoose from "mongoose";
import UserSchema from "../../Models/UserSchema";
import uuid from 'uuid';
import jwt from "jsonwebtoken";


class UserManager implements IUserManager{
    ID: number = new Date().getTime();
    // login: string = null;
    // mail: string = null;
    // password: string = null;

    private User: any = null;

    constructor(){
        this.User = UserSchema;
    }
		
		////////////////////////////
		//////////////////////////// Методы для нахождения пользователя
		////////////////////////////
    private async _findUserFromLogin(login: string) : Promise<IUser>{
        return await this.User.findOne({login: login}, (err: any, result: any) => {
            if(err) throw new Error(err);
            return result
        })
    }
    private async _findUserFromId(ID: number) : Promise<IUser>{
        return await this.User.findOne({ID: ID}, (err: any, result: any) => {
            if(err) throw new Error(err);
            return result
        })
    }
    private async _findUserFromMail(mail: string) : Promise<IUser>{
        return await this.User.findOne({mail: mail}, (err: any, result: any) => {
            if(err) throw new Error(err);
            return result
        })
    }
		////////////////////////////
		//////////////////////////// Регистрация
		////////////////////////////
    async register(login: string, mail: string, password: string): Promise<UserResponces.IRegister>{

        interface IUserModel extends Document, IUser{}

        let newUser: IUserModel = new this.User({
            ID: this.ID,
            login: login,
            mail: mail,
            password: password
        });

        let mailChecking = await this._findUserFromMail(newUser.mail);
        let loginChecking = await this._findUserFromLogin(newUser.login);

        if(mailChecking){
            console.log('mail error');
            return{
                code: 301,
                status: 'Failed',
                msg: 'Пользователь с такой почтой уже существует',
                id: null
            }
        }
        if(loginChecking){
            console.log('login error');
            return{
                code: 302,
                status: 'Failed',
                msg: 'Пользователь с таким логином уже существует',
                id: null
            }
        }

        await newUser.save();
        return {
            code: 200,
            status: 'Ok',
            msg: 'Пользователь успешно создан',
            id: this.ID
        };
    }

		////////////////////////////
		//////////////////////////// Авторизация
		////////////////////////////
    async auth(login: string, pass: string): Promise<UserResponces.IAuth>{
        if(!!!login || !!!pass){
            return{
                code: 404,
                uid: null,
                status: 'failed',
                token: '',
                refresh_token: '',
                msg: 'Не передан логин или пароль.'
            }
        }
        let currentUser: IUser = await this._findUserFromLogin(login);

        if(pass.toString() === currentUser.password.toString()){
            return {
                code: 404,
                status: 'ok',
                token: '',
                refresh_token: '',
                uid: currentUser.ID
            }
        }else{
            return{
                code: 404,
                uid: null,
                status: 'failed',
                token: '',
                refresh_token: '',
                msg: 'Не верная пара Логин - Пароль'
            }
        }
    }
    async login(login: string, pass: string): Promise<UserResponces.IAuth>{
        if(!!!login || !!!pass){
            return{
                code: 400,
                status: 'failed',
                uid: null,
                token: '',
                refresh_token: '',
                msg: 'Не передан логин или пароль.'
            }
        }
        let currentUser: IUser = await this._findUserFromLogin(login);
        const refreshToken = uuid();

        if(!currentUser || pass.toString() !== currentUser.password.toString()){
            return{
                code: 400,
                status: 'failed',
                uid: null,
                token: '',
                refresh_token: '',
                msg: 'Не верная пара Логин - Пароль'
            }
        }else{
            return {
                code: 200,
                status: 'ok',
                token: jwt.sign({ id: currentUser.ID }, 'VERYSECRETKEY'),
                refresh_token: refreshToken,
                uid: currentUser.ID
            }
        }
    }
}

export default UserManager;