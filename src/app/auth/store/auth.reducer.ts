import { Action } from "@ngrx/store"
import { User } from "../auth/user.model"
import * as AuthActions from "./auth.actions"

export interface AuthState{
    user:User,
    authError:string,
    loading:boolean
}

const initialState : AuthState = {
  user:null,
  authError:null,
  loading:false
}

export function authReducer(state = initialState, action:AuthActions.AuthActions){
  switch (action.type) {
    case AuthActions.LOGIN_START:
      return { 
        ...state, 
        authError:null,
        loading:true 
      }

    case AuthActions.AUTHENTICATE_FAIL:
      return { 
        ...state, 
        user:null,
        authError:action.payload,
        loading:false 
      }

    case AuthActions.AUTHENTICATE_SUCCESS:
      const user=new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      )
      return { 
        ...state, 
        user:user,
        authError:null,
        loading:false 
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
