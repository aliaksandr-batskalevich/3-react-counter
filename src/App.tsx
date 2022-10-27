import React, {useEffect} from "react";
import {Counter} from "./components/Counter";
import {SettingsOfCounter} from "./components/SettingsOfCounter";
import s from './components/Counter.module.css'
import {useDispatch, useSelector} from "react-redux";
import {CounterStateType} from "./store/store";
import {
    increment,
    InitializeStateType,
    ModeType,
    setNumOfDisplay,
    setError,
    setMode,
    setRules, RulesType
} from "./store/counterReducer";

export const App = () => {

    const {
        mode,
        numOfDisplay,
        rules,
        error
    } = useSelector<CounterStateType, InitializeStateType>(state => state.counterData);
    const dispatch = useDispatch();

    useEffect(() => {
        let numOfDisplayFLS: string | null = localStorage.getItem('numOfDisplay');
        let rulesFLS: string | null = localStorage.getItem('rules');

        numOfDisplayFLS && dispatch(setNumOfDisplay(JSON.parse(numOfDisplayFLS)));
        if (rulesFLS) {
            let rulesFLSNew = JSON.parse(rulesFLS) as RulesType;
            dispatch(setRules(rulesFLSNew.startValue, rulesFLSNew.maxValue));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('numOfDisplay', JSON.stringify(numOfDisplay));
        localStorage.setItem('rules', JSON.stringify(rules));
    }, [numOfDisplay, rules]);


    const incrementHandler = () => {
        dispatch(increment());
    };
    const resetHandler = (start: number = rules.startValue) => {
        dispatch(setNumOfDisplay(start));
    };
    const modeCallBackHandler = (newMode: ModeType) => {
        dispatch(setMode(newMode));
    };
    const rulesCallBackHandler = (newStart: number, newMax: number) => {
        dispatch(setRules(newStart, newMax));
        resetHandler(newStart);
    };
    const setErrorCallBackHandler = (error: boolean) => {
        dispatch(setError(error));
    }

    return (
        <div className={s.mainWrapper}>
            <Counter
                mode={mode}
                rules={rules}
                numOfDisplay={numOfDisplay}
                error={error}
                incrementCallBack={incrementHandler}
                resetCallBack={resetHandler}
            />
            <SettingsOfCounter
                mode={mode}
                rules={rules}
                error={error}
                setErrorCallBack={setErrorCallBackHandler}
                modeCallBack={modeCallBackHandler}
                rulesCallBack={rulesCallBackHandler}
            />
        </div>
    )
}