import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";


/**
 * Game play page. Loads data based on url parameter.
 * @returns Functional componen
 */
const Quiz: React.FC = () => {
    let {level} = useParams<Record<string, string>>();
    let {t, i18n} = useTranslation("common");
    // TODO fetch data based on url
    // TODO verify that level is easy | medium | hard. If not set easy

    return(
        <div>
            <h1>{t("gamePage.title")} {t(`gamePage.${level}`)}</h1>
        </div>
    );
}

export default Quiz;