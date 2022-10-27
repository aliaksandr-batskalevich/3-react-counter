import {combineReducers, legacy_createStore} from "redux";
import {counterReducer} from "./counterReducer";
export type CounterStateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({counterData: counterReducer});

export const store = legacy_createStore(rootReducer);