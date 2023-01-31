import { Action } from "@ngrx/store"
import { User } from "../auth/user.model"

export const LOGIN='[Auth] Login'
export const LOGOUT='[Auth] Logout'

export class Login implements Action{
    readonly type=LOGIN
    constructor(public payload:User) {
        
    }
}
export class Logout implements Action {
    readonly type=LOGOUT
}

export type AuthActions=Login|Logout