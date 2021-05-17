import React from "react";
import { useTranslation } from "react-i18next";
import {useHistory} from "react-router-dom";
import H from "history";
import { AppButton, StyleEnum } from "../button/button";


type props = { fullFeedback: any, }

const Feedback: React.FC<props> = ({fullFeedback}) => {
    let correctAmount = 0;
    let textFeedback: any[] = [];
    let {t, i18n} = useTranslation("common");
    let history: H.History<History> = useHistory();


    fullFeedback.forEach((element: any) => {
        if(element.correct){
            correctAmount++;
        }
        textFeedback.push(element.question);
    });

    let finalFeedback = textFeedback.map((element, index) => 
        <div key={textFeedback.indexOf(element)} >
            <p>{!fullFeedback[index].correct? <i className="far fa-times-circle"></i>:<i className="far fa-check-circle"></i> }</p>
            <p>{t("feedback.question") + element.question}</p>
            <p>{t("feedback.correct") + element.correct}</p>
            <p>{t("feedback.details")+ element.explanation}</p>
            <hr />
        </div>
    );

    const playAgain = (event: React.MouseEvent<HTMLButtonElement>) => {
        history.push("/difficulty");
    }

    return(
        <div>
            <h1>{t("feedback.header")}</h1>
            <h2>{t("feedback.header2") + correctAmount + t("feedback.header21")}</h2>
            <h3>{t("feedback.header3")}</h3>
            <hr />
            {finalFeedback}
            <AppButton btnStyle={StyleEnum.black} text={t("feedback.againBtn")} behaviour={playAgain}/>
        </div>
    );

}


export default Feedback;