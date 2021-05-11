import React from "react";
import "./appButton.css";

enum StyleEnum {
    white = "app_button_button_white",
    black = "app_button_button_black"
}


type Props = {
    text: string,
    behaviour: React.MouseEventHandler<HTMLButtonElement>,
    btnStyle: StyleEnum,
    btnValue?: string | number,
}

/**
 * Basic button for page. Behaviour can be modified with event handler. Pass event handler via props -> behaviour.
 * If button is for example choice pass expected return value -> btnValue, string or number. Style is set through StylesEnum [].
 * @param Props text -> [string], behaviour -> [React.MouseEventHandler<HTMLButtonElement>], btnValue -> [string | number], btnStyle -> StyleEnum.[white | black ]
 * @returns functional component
 * @exports AppButton --- react functional component
 * @exports StyleEnum --- buttons style defination
 */

const AppButton: React.FC<Props> = ({text, behaviour, btnValue, btnStyle}) => {
    return(
        <button className={`${btnStyle} app_button`} value={btnValue} onClick={behaviour}> {text} </button>
    );
}

export {AppButton, StyleEnum};