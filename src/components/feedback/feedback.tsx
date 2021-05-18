import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {useHistory} from "react-router-dom";
import {CSSTransition} from "react-transition-group";
import H from "history";
import { AppButton, StyleEnum } from "../button/button";
import "./feedback.css";


type props = { fullFeedback: any /* Should be : AnswerMap{question:Question, correct: number} */, }
/**
 * Generates feedback how user performed. TODO: fix types
 * @param param0 props: { fullFeedback: any }
 * @returns functional component
 */
const Feedback: React.FC<props> = ({fullFeedback}) => {
    let correctAmount = 0;
    let textFeedback: any[] = [];
    let {t} = useTranslation("common");
    let history: H.History<History> = useHistory();
    const [anim, setAnim] = useState<boolean | undefined>(undefined);
    const divRef = React.useRef(null);

    // for animation to run initially
    useEffect(() => {
        setAnim(true);
    }, [])

    // calculate correct answers, and seperate object: Question to different array
    fullFeedback.forEach((element: any) => {
        if(element.correct){
            correctAmount++;
        }
        textFeedback.push(element.question);
    });

    // map feedback: AnswerMap{question: Question, correct: number} to renderable list
    let finalFeedback = textFeedback.map((element, index) => 
        <div key={textFeedback.indexOf(element)} >
            <p>{!fullFeedback[index].correct? <i className="far fa-times-circle feedback_icon"></i>:<i className="far fa-check-circle feedback_icon"></i> }</p>
            <p>{t("feedback.question") + element.question}</p>
            <p>{t("feedback.correct") + element.correct}</p>
            <p>{t("feedback.details")+ element.explanation}</p>
            <hr />
        </div>
    );

    // Playagain button function. Triggers CSSTranslation to go exited stage wich has anonymous func. that executes history.push.... 
    const playAgain = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnim(false);
    }

    return(
        <CSSTransition in={anim} timeout={1000} onExited={() => history.push("/difficulty")} classNames='feedback-fade' unmountOnExit nodeRef={divRef}>
            <div ref={divRef} className="feedback_wrapper">
                <h2>{t("feedback.header")}</h2>
                <h3>{t("feedback.header2") + correctAmount + t("feedback.header21")}</h3>
                <h4>{t("feedback.header3")}</h4>
                <hr />
                {finalFeedback}
                <AppButton btnStyle={StyleEnum.black} text={t("feedback.againBtn")} behaviour={playAgain}/>
            </div>
        </CSSTransition>
    );

}


export default Feedback;