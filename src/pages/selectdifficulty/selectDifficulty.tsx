import React from "react";
import {useTranslation} from "react-i18next";
import {AppButton, StyleEnum} from "../../components/button/button";
import "./selectDifficulty.css";



const DifficultySelection: React.FC = () =>{
    const {t, i18n} = useTranslation("common");

    const moveToGame = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(event.currentTarget.value);
    }
    
    return(
            <div>
                <h1 className="selectDifficulty_headline">{t('difficultyPage.title')}</h1>
                <div className="selectDifficulty_btnContainer">
                    <AppButton text={t('difficultyPage.easy')} behaviour={moveToGame} btnValue="easy" btnStyle={StyleEnum.white}></AppButton>
                    <AppButton text={t('difficultyPage.medium')} behaviour={moveToGame} btnValue="easy" btnStyle={StyleEnum.black}></AppButton>
                    <AppButton text={t('difficultyPage.hard')} behaviour={moveToGame} btnValue="easy" btnStyle={StyleEnum.white}></AppButton>
                </div>
            </div>
    );
}

export default DifficultySelection;
