import React, {useEffect, useRef, useState} from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import firebase from "firebase/app"
import "firebase/database";
import knuthShuffle from "../../shuffle";
import Answer from "../../components/answer/answer";
import Feedback from "../../components/feedback/feedback";
import "./quiz.css";


type Question = {
    correct: string,
    explanation: string,
    false1: string,
    false2: string,
    question: string,
    type: string
}

type AnswerMap = {
    question: Question,
    correct: boolean
}


/**
 * Game play page. Loads data based on url parameter.
 * @returns Functional componen
 */
const Quiz: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [errorMessage, setMessage] = useState<string | any>("");
    const [playing, setPlaying] = useState<boolean>(true);
    const shouldIncrement = useRef(false);

    // Player progress state
    const [answerMap, setAnswerMap] = useState<AnswerMap[]>([]);
    let correct = 0;

    //level and lang
    const {level} = useParams<Record<string, string>>();
    let {t, i18n} = useTranslation("common");

    // get data from database
    useEffect(() => {
        let data: firebase.database.DataSnapshot;
        /**Retrieves data from db. Based on url. */
        const getData = async () => {
            let tempData : Question[] = [];
            try {
                data = await firebase.database().ref().child(i18n.language).child(level).get();
                data.forEach(entry => {
                    tempData.push(entry.val());
                });
                setQuestions(knuthShuffle(tempData).slice(0, 10)); 
            } catch (error) {
                setMessage(error.message);
            }
        }
        getData();
    }, []);

    // get new question after user has answered and state is updated
    useEffect(() => {
        const incrementQuestion = (): void => {
            if(currentQuestionIndex + 1 < questions.length){
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }else{
                setPlaying(false);
                // TODO show player feedback
            }
        }
        if(shouldIncrement.current){
            incrementQuestion();
        }else{
            shouldIncrement.current = true;
        }
    }, [answerMap]);

    /**
     * Function to check answer and to render next question.
     * @param event Button click event
     */
    const answered = async (event: React.MouseEvent<HTMLButtonElement>) => {
        let correctOrWrong: boolean;
        if(event.currentTarget.value === questions[currentQuestionIndex].correct){
            correctOrWrong = true;
        }
        else{
            correctOrWrong = false;
        }
        let newState = [...answerMap];
        newState.push({question:questions[currentQuestionIndex], correct:correctOrWrong});
        setAnswerMap(newState);
    }


    return(
        <div>
            { questions.length <= 0 && <h1 className="quiz_helper_headers">Loading</h1>}
            {errorMessage.length > 0 && <h1 className="quiz_helper_headers">{'ERROR: ' +  errorMessage}</h1>}
            {questions.length > 0 && playing &&
                <div className="quiz_wrapper">
                    <h1>{questions[currentQuestionIndex].question}</h1>
                    <h2>{t("quiz.answered") + (currentQuestionIndex + 1) + "/10"}</h2>
                    <Answer 
                        options={[
                            questions[currentQuestionIndex].correct, 
                            questions[currentQuestionIndex].false1, 
                            questions[currentQuestionIndex].false2
                        ]} 
                        eventHandler={answered}
                        >
                    </Answer>
                </div>
            }
            {!playing && answerMap.length > 0 && 
                <div className="quiz_wrapper">
                    <Feedback fullFeedback={answerMap} />
                </div>
            
            
            }

        </div>
    );
}

export default Quiz;