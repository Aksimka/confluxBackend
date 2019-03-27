namespace UserResponces{

    import IUser = Interfaces.IUser;
    
    export interface IRegister {
        id: number
        status: string
        code: number
        mail?: any
        msg?: string
    }
    
    export interface IAuth {
        code: number
        uid: number
        status: string
        token: string
        refresh_token: string
        msg?: string
    }
    
    export interface IGetUserInfo {
        status: string
        user: IUser
		}
		
		export interface ICreateDataBase {
				status: string
				code: number
				msg?: string
			
		}
    
}