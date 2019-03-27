
import UserSchema from "../../Models/UserSchema";

export default class FindUserService{
    static async findUserFromLogin(login: string){
        return await UserSchema.findOne({login}, (err, result)=> {
            if(err) throw new Error(err);
            return result
        })
    }
    static async findUserFromId(id: number){
        return await UserSchema.findOne({id}, (err, result)=> {
            if(err) throw new Error(err);
            return result
        })
    }
    static async findUserFromMail(mail: string){
        return await UserSchema.findOne({mail}, (err, result)=> {
            if(err) throw new Error(err);
            return result
        })
    }
}
