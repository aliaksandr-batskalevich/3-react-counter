import s from "./ButtonForCounter.module.css";
import React from "react";

type ButtonForCounterPropsType = {
    title: string
    callBack: () => void
    disabled: boolean
}

export const ButtonForCounter = (props: ButtonForCounterPropsType) => {

    const onClickButtonHandler = () => {
        props.callBack();
    }

    return (
        <button disabled={props.disabled} className={s.button} onClick={onClickButtonHandler}>{props.title}</button>
    )
}


