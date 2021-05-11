import React from "react";
import {useTranslation} from "react-i18next";
import { useHistory } from "react-router";
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

    const moveToGame = (event: React.MouseEvent<HTMLButtonElement>) => {
        history.push(`/game/${event.currentTarget.value}`)
    }
    
    return(
            <div>
                <h1 className="selectDifficulty_headline">{t('difficultyPage.title')}</h1>
                <div className="selectDifficulty_btnContainer">
                    <AppButton text={t('difficultyPage.easy')} behaviour={moveToGame} btnValue="easy" btnStyle={StyleEnum.white}></AppButton>
                    <AppButton text={t('difficultyPage.medium')} behaviour={moveToGame} btnValue="medium" btnStyle={StyleEnum.black}></AppButton>
                    <AppButton text={t('difficultyPage.hard')} behaviour={moveToGame} btnValue="hard" btnStyle={StyleEnum.white}></AppButton>
                </div>
            </div>
    );
}

export default DifficultySelection;
