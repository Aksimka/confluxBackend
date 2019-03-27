namespace Interfaces{
    export interface IUserManager {

        readonly ID: number

        register(login: string, password: string, mail: string, firstName?: string, lastName?: string)
        auth(login: string, pass: string)
        login(login: string, pass: string)
    }
}

