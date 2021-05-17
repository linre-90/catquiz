import React from "react";
import {AppButton, StyleEnum} from "../button/button";
import knuthShuffle from "../../shuffle";

type props = {
    options: string[]
    eventHandler: React.MouseEventHandler<HTMLButtonElement>,
}

/**
 * Component creates answer buttons for every option in props.options. Button has props.eventHandler that triggers parents function to evaluate answer and change to next one.
 * @param param0 props{ options: [Answer options], eventHandler: React.MouseEventHandler<HTMLButtonElement> }
 * @returns react functional component
 */
const Answer: React.FC<props> = ({options, eventHandler}) => {
    const shuffledOptions: string[] = knuthShuffle([...options]);
    let components: JSX.Element[] = shuffledOptions.map((option) => 
       <AppButton key={shuffledOptions.indexOf(option)} btnStyle={StyleEnum.black} behaviour={eventHandler} btnValue={option} text={option} />
    );
    return (
        <div>
            {components}
        </div>
    )
}


export default Answer;