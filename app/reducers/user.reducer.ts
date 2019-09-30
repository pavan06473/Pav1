import { Action } from '@ngrx/store'
import { User } from './../user/user.model'
import * as UserActions from './../actions/user.actions'


export function userReducer(state: User[] = [], action: UserActions.Actions) {

    // Section 3
    switch(action.type) {
        case UserActions.ADD_USER:
            return [...state, action.payload];

        case UserActions.REMOVE_USER:
            state.splice(action.index, 1);
            return state;

        default:
            return state;
    }
}