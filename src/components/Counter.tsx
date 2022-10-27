import React from "react";
import s from './Counter.module.css'
import {ButtonForCounter} from "./ButtonForCounter";
import {ModeType, RulesType} from "../store/counterReducer";

type CounterPropsType = {
    mode: ModeType
    rules: RulesType
    numOfDisplay: number
    error: boolean
    incrementCallBack: () => void
    resetCallBack: () => void
}

export const Counter: React.FC<CounterPropsType> = ({
                                                        rules,
                                                        mode,
                                                        numOfDisplay,
                                                        error,
                                                        incrementCallBack,
                                                        resetCallBack
                                                    }) => {

    const styleForDisplay = mode === "counter" && numOfDisplay >= rules.maxValue
        ? `${s.display} ${s.displayMaxValue}`
        : mode === "counter" && numOfDisplay < rules.maxValue
            ? s.display
            : mode === "settings" && error
                ? `${s.display} ${s.messageOnDisplay} ${s.error}`
                : `${s.display} ${s.messageOnDisplay}`;

    const incrementCallBackHandler = () => {
        incrementCallBack();
        console.log(rules);
    }

    return (
        <div className={s.counterOutWrapper}>
            <div className={s.counterInWrapper}>
                <div className={s.displayWrapper}>
                    <div className={styleForDisplay}>
                        {mode === "counter"
                            ? numOfDisplay
                            : error
                                ? 'incorrect settings!'
                                : 'set your settings.'}
                    </div>
                </div>
                <div className={s.buttonWrapper}>
                    <ButtonForCounter
                        title={'INC'}
                        callBack={incrementCallBackHandler}
                        disabled={numOfDisplay >= rules.maxValue || mode === 'settings'}
                    />
                    <ButtonForCounter
                        title={'RESET'}
                        callBack={resetCallBack}
                        disabled={numOfDisplay === rules.startValue || mode === 'settings'}
                    />
                </div>
            </div>
        </div>
    )
};