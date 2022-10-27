export type ModeType = 'settings' | 'counter';
export type RulesType = {
    startValue: number
    maxValue: number
};
export type InitializeStateType = {
    mode: ModeType
    numOfDisplay: number
    rules: RulesType
    error: boolean
}
type CounterActionsType = ReturnType<typeof setMode> | ReturnType<typeof increment> | ReturnType<typeof setNumOfDisplay> | ReturnType<typeof setRules> | ReturnType<typeof setError>

const initializeState: InitializeStateType = {
    mode: 'counter',
    numOfDisplay: 0,
    rules: {
        startValue: 0,
        maxValue: 5
    },
    error: false,
};

export const counterReducer = (state = initializeState, action: CounterActionsType) => {
    switch (action.type) {
        case "SET-MODE":
            return {...state, ...action.payload};
        case "INCREMENT":
            return {...state, numOfDisplay: state.numOfDisplay + 1};
        case "RESET":
            return {...state, ...action.payload};
        case "SET-RULES":
            debugger
            return {...state, rules: {...action.payload}};
        case "SET-ERROR":
            return {...state, ...action.payload}
        default:
            return state;
    }
}

export const setMode = (mode: ModeType) => {
    return {
        type: "SET-MODE",
        payload: {mode},
    } as const
};
export const increment = () => {
    return {
        type: "INCREMENT",
        payload: {}
    } as const
};
export const setNumOfDisplay = (numOfDisplay: number) => {
    return {
        type: "RESET",
        payload: {numOfDisplay}
    } as const
};
export const setRules = (newStart: number, newMax: number) => {
    return {
        type: "SET-RULES",
        payload: {startValue: newStart, maxValue: newMax}
    } as const
};
export const setError = (error: boolean) => {
    return {
    type: "SET-ERROR",
    payload: {error}
    } as const
}