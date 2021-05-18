import React, {useEffect, useRef, useState} from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import {CSSTransition} from "react-transition-group";
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
 * Game play page. Loads data based on url parameter and language.
 * Swaps components between game going and feedback to eliminate problems with browser backbutton.
 * @returns Functional componen
 */
const Quiz: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [errorMessage, setMessage] = useState<string | any>("");
    const [playing, setPlaying] = useState<boolean>(true);
    const shouldIncrement = useRef(false);

    // animation
    const divRef = React.useRef(null);
    const [anim, setAnim] = useState<boolean|undefined>(undefined);

    // Player progress state
    const [answerMap, setAnswerMap] = useState<AnswerMap[]>([]);

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
        setAnim(true);
        // Linting is disabled because questions should only be loaded one time
        // Simulating componentDidMount, [] tells react/es-lint that hook is depended on some values/functions etc and based on those changes should re-render.
        // How ever this hook is wanted to execute only once. The depencies should not change, level comes from url that triggers re-render anyway and i18n is needed for correct
        // searching in database. The language is set on "home" page and is not changeable on other pages -> it shoul not trigger update in this hook.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // get new question after user has answered and state is updated
    useEffect(() => {
        const incrementQuestion = (): void => {
            if(currentQuestionIndex + 1 < questions.length){
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }else{
                setPlaying(false);
                setAnim(false);
            }
        }
        if(shouldIncrement.current){
            incrementQuestion();
        }else{
            shouldIncrement.current = true;
        }
        // Linting error is disabled because this should not re-render on questions.length or currentQuestionIndex changes
        // Question.length should not change at any point
        // This hook simulates following behaviour [ await setAnswerMap(); incrementQuestion(); ] , it works as a callback after the state has updated.
        // State (answermap) does not update immediately on button press, that causes answermap to be one question behind -> saves 9/10  
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [answerMap]);

    /**
     * Function to check answer and to update feedback list (answerMap).
     * @param event Button click event
     */
    const answered = async (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnim(false);
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
        <div className="minHeigthDiv">
            {questions.length <= 0 && <h1 className="quiz_helper_headers">Loading</h1>}
            {/* Displays firebase errors */}
            {errorMessage.length > 0 && <h1 className="quiz_helper_headers">{'ERROR: ' +  errorMessage}</h1>}
            {/* Actual game going stage. Shows 10 questions then playing becomes false and this is not rendered*/}
            {questions.length > 0 && playing &&
                // onExited loops animation enter exit stage together with answered function.
                <CSSTransition in={anim} timeout={200} onExited={() => setAnim(true)} classNames='quiz-fade' unmountOnExit nodeRef={divRef}>
                    <div ref={divRef} className="quiz_wrapper">
                        <h2>{questions[currentQuestionIndex].question}</h2>
                        <h3>{t("quiz.answered") + (currentQuestionIndex + 1) + "/10"}</h3>
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
                </CSSTransition>
            }
            {/* All questions have been answered renders feedback for user */}
            {!playing && answerMap.length > 0 && 
                <div className="quiz_wrapper">
                    <Feedback fullFeedback={answerMap} />
                </div>
            }
        </div>
    );
}

export default Quiz;