import React, {useEffect, useState} from "react";
import {Counter} from "./components/Counter";
import {SettingsOfCounter} from "./components/SettingsOfCounter";
import s from './components/Counter.module.css'

export type rulesType ={
    startValue: number
    maxValue: number
}
export type modeType = 'settings' | 'counter'

let startRules: rulesType = {
    startValue: 0,
    maxValue: 5
};

export const App = () => {

    let [rules, setRules] = useState<rulesType>(startRules);
    let [mode, setMode] = useState<modeType>("counter");
    let [numOfDisplay, setNumOfDisplay] = useState<number>(rules.startValue);
    let [error, setError] = useState<boolean>(false);

    useEffect(() => {
        let counterFromLocalStorage: string | null = localStorage.getItem("numOfCounter");
        if (counterFromLocalStorage) {
            setNumOfDisplay(JSON.parse(counterFromLocalStorage));
        }
        let modeFromLocalStorage: string | null = localStorage.getItem("modeOfCounter");
        if (modeFromLocalStorage === 'settings' || modeFromLocalStorage === 'counter') {
          setMode(modeFromLocalStorage);
        }
        let rulesFromLocalStorageInString: string | null = localStorage.getItem("rulesOfCounter");
        if (rulesFromLocalStorageInString) {
            let rulesFromLocalStorageInObj = JSON.parse(rulesFromLocalStorageInString);
            setRules(rulesFromLocalStorageInObj);
        }
    }, []);
    useEffect(() => {
        localStorage.setItem('numOfCounter', JSON.stringify(numOfDisplay));
        localStorage.setItem('modeOfCounter', mode);
        localStorage.setItem('rulesOfCounter', JSON.stringify(rules));
    }, [numOfDisplay, mode, rules]);

    const increment = () => {
        setNumOfDisplay(++numOfDisplay);
    };
    const reset = (start: number = rules.startValue) => {
        setNumOfDisplay(start);
    };
    const modeCallBackHandler = (newMode: modeType) => {
        setMode(newMode);
    };
    const rulesCallBackHandler = (newStart: number, newMax: number) => {
        setRules({startValue: newStart, maxValue: newMax});
        reset(newStart);
    };
    const setErrorCallBackHandler = (error: boolean) => {
        setError(error);
    }

    return (
        <div className={s.mainWrapper}>
            <Counter
                mode={mode}
                rules={rules}
                numOfDisplay={numOfDisplay}
                error={error}
                incrementCallBack={increment}
                resetCallBack={reset}
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