import React, {useEffect, useState} from "react";
import s from './Counter.module.css'
import {ButtonForCounter} from "./ButtonForCounter";
import {modeType, rulesType} from "../App";

type CounterPropsType = {
    mode: modeType
    rules: rulesType
    numOfDisplay: number
    incrementCallBack: () => void
    resetCallBack: () => void
}

export const Counter: React.FC<CounterPropsType> = ({rules, mode, numOfDisplay, incrementCallBack, resetCallBack}) => {

    // useEffect(() => {
    //     let dataFromLocalStorage: string | null = localStorage.getItem("numOfCounter");
    //     if (dataFromLocalStorage) {
    //         setNumOfDisplay(JSON.parse(dataFromLocalStorage));
    //     }
    // }, []);

    // useEffect(() => {
    //     localStorage.setItem('numOfCounter', JSON.stringify(numOfDisplay))
    // }, [numOfDisplay]);

    const styleForDisplay = numOfDisplay >= rules.maxValue && mode === "counter" ? `${s.display} ${s.displayMaxValue}` : numOfDisplay < rules.maxValue && mode === "counter" ? s.display : `${s.display} ${s.messageOnDisplay}`;

    return (
        <div className={s.counterOutWrapper}>
            <div className={s.counterInWrapper}>
                <div className={s.displayWrapper}>
                    <div className={styleForDisplay}>
                        {mode === "counter"
                            ? numOfDisplay
                            : 'set your settings.'}
                    </div>
                </div>
                <div className={s.buttonWrapper}>
                    <ButtonForCounter
                        title={'INC'}
                        callBack={incrementCallBack}
                        disabled={numOfDisplay >= rules.maxValue || mode === 'settings'}
                    />
                    <ButtonForCounter
                        title={'RESET'}
                        callBack={resetCallBack}
                        disabled={numOfDisplay === rules.startValue  || mode === 'settings'}
                    />
                </div>
            </div>
        </div>
    )
};