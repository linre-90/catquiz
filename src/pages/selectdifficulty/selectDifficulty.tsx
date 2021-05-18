import React, { useEffect, useState } from "react";
import {useTranslation} from "react-i18next";
import { useHistory } from "react-router";
import {CSSTransition} from "react-transition-group";
import H from "history";
import {AppButton, StyleEnum} from "../../components/button/button";
import "./selectDifficulty.css";



/**
 * Page component to select difficulty level.
 * Navigates to game after selection. Sets difficulty to /game/:difficulty
 * @returns  React functional component
 */
const DifficultySelection: React.FC = () =>{
    const {t, i18n} = useTranslation("common");
    let history: H.History = useHistory();
    const divRef = React.useRef(null);
    const [anim, setAnim] = useState<boolean|undefined>(undefined);
    const [toGameUrl, setToGameUrl] = useState<string>("");

    useEffect(() => {
        setAnim(true);
    },[]);


    const moveToGame = (event: React.MouseEvent<HTMLButtonElement>) => {
        setToGameUrl(`/game/${event.currentTarget.value}`);
        setAnim(false);
        //history.push(`/game/${event.currentTarget.value}`);
    }

    return(
        <CSSTransition in={anim} timeout={1000} onExited={() => history.push(toGameUrl.length > 0 ? toGameUrl: "/game/easy")} classNames='diff-fade' unmountOnExit nodeRef={divRef} >
            <div className="minHeigthDiv" ref={divRef}>
                <h1 className="selectDifficulty_headline">{t('difficultyPage.title')}</h1>
                <div className="selectDifficulty_btnContainer">
                    <AppButton text={t('difficultyPage.easy')} behaviour={moveToGame} btnValue="easy" btnStyle={StyleEnum.white}></AppButton>
                    <AppButton text={t('difficultyPage.medium')} behaviour={moveToGame} btnValue="medium" btnStyle={StyleEnum.black}></AppButton>
                    <AppButton text={t('difficultyPage.hard')} behaviour={moveToGame} btnValue="hard" btnStyle={StyleEnum.white}></AppButton>
                </div>
            </div>
        </CSSTransition>
    );
}

export default DifficultySelection;
