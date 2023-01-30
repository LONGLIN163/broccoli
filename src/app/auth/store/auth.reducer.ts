import { Action } from "@ngrx/store"
import { User } from "../auth/user.model"

export interface AuthState{
    user:User
}

const initialState : AuthState = {
  user:null
}

export function authReducer(state = initialState, action:Action){
  switch (action.type) {

  case '':
    return { ...state, ...action }

  default:
    return state
  }
}
