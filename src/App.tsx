import React, {useState} from "react";
import {Counter} from "./components/Counter";
import {SettingsOfCounter} from "./components/SettingsOfCounter";
import s from './components/Counter.module.css'

export type rulesType = {
  startValue: number
  maxValue: number
};
export type modeType = 'settings' | 'counter';

let startRules: rulesType = {
  startValue: 0,
  maxValue: 10
};

export const App = () => {

  let [rules, setRules] = useState<rulesType>(startRules);
  let [mode, setMode] = useState<modeType>("counter");
  let [numOfDisplay, setNumOfDisplay] = useState<number>(rules.startValue);

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

  return (
      <div className={s.mainWrapper}>
        <Counter
            mode={mode}
            rules={rules}
            numOfDisplay={numOfDisplay}
            incrementCallBack={increment}
            resetCallBack={reset}
        />
        <SettingsOfCounter
            mode={mode}
            rules={rules}
            modeCallBack={modeCallBackHandler}
            rulesCallBack={rulesCallBackHandler}
        />
      </div>
  )
}