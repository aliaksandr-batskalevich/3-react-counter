import React, {ChangeEvent, useEffect, useState} from "react";
import s from "./Counter.module.css";
import {ButtonForCounter} from "./ButtonForCounter";
import {ModeType, RulesType} from "../store/counterReducer";

type SettingsOfCounterPropsType = {
    mode: ModeType
    rules: RulesType
    error: boolean
    setErrorCallBack: (error: boolean) => void
    modeCallBack: (newMode: ModeType) => void
    rulesCallBack: (newStart: number, newMax: number) => void
}

export const SettingsOfCounter: React.FC<SettingsOfCounterPropsType> = ({
                                                                            mode,
                                                                            rules,
                                                                            error,
                                                                            setErrorCallBack,
                                                                            modeCallBack,
                                                                            rulesCallBack
                                                                        }) => {
    let [maxValue, setMaxValue] = useState<number>(rules.maxValue);
    let [startValue, setStartValue] = useState<number>(rules.startValue);

    useEffect(() => {
        setMaxValue(rules.maxValue);
        setStartValue(rules.startValue);
    }, [rules]);

    const errorTest = () => {
        if (startValue < 0
            || maxValue > 20
            || maxValue <= startValue) {
            setErrorCallBack(true);
        } else {
            setErrorCallBack(false);
        }
    };

    useEffect(() => {
        errorTest()
    }, [startValue, maxValue]);

    const onClickModeHandler = (newMode: ModeType) => {
        modeCallBack(newMode);
    }
    const onChangeInputMaxHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setMaxValue(+event.currentTarget.value);
    };
    const onChangeInputStartHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setStartValue(+event.currentTarget.value);
    };
    const setSettingsHandler = () => {
        rulesCallBack(startValue, maxValue);
        onClickModeHandler('counter');
    }

    let styleForInput = error ? s.errorInput : '';

    return (
        <div className={s.counterOutWrapper}>
            <div className={s.counterInWrapper}>
                <div className={`${s.displayWrapper} ${s.displayWrapperForSettings}`}>
                    <div className={s.maxValueWrapper}>
                        <span className={s.legend}>max value</span>
                        <input
                            className={styleForInput}
                            value={maxValue}
                            type="number"
                            onClick={() => onClickModeHandler("settings")}
                            onChange={onChangeInputMaxHandler}
                        />
                    </div>
                    <div className={s.startValueWrapper}>
                        <span className={s.legend}>start value</span>
                        <input
                            className={styleForInput}
                            value={startValue}
                            type="number"
                            onClick={() => onClickModeHandler("settings")}
                            onChange={onChangeInputStartHandler}
                        />
                    </div>
                </div>
                <div className={`${s.buttonWrapper} ${s.buttonWrapperForSettings}`}>

                    <ButtonForCounter
                        title={'SET'}
                        callBack={setSettingsHandler}
                        disabled={mode === "counter" || error}/>
                </div>
            </div>
        </div>
    )
}