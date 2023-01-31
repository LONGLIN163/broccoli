import { Action } from "@ngrx/store"
import { User } from "../auth/user.model"
import * as AuthActions from "./auth.actions"

export interface AuthState{
    user:User
}

const initialState : AuthState = {
  user:null
}

export function authReducer(state = initialState, action:AuthActions.AuthActions){
  switch (action.type) {
    case AuthActions.LOGIN:
      return { 
        ...state, 
        user:action.payload 
      }

    case AuthActions.LOGOUT:
      return { 
        ...state, 
        user:null 
      }

    default:
      return state
  }
}
