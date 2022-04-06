import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import correct from "../sounds/Correct Answer Sound Effect.mp3";
import wrong from "../sounds/Wrong Answer sound effect.mp3";


const Questionnaire = ({
    data: { question, correct_answer, answers },
    showAnswers,
    handleNextQuestion,
    handleAnswer,

    questionNumber,
    setQuestionNumber,

}) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState("answer");
    const [correctAnswer] = useSound(correct);
    const [wrongAnswer] = useSound(wrong);




    const delay = (duration, callback) => {
        setTimeout(() => {
            callback();
        }, duration);
    };

    const handleClick = (answer) => {
        setSelectedAnswer(answer);
        setClassName("answer active");
        delay(3000, () => {
            setClassName(answer === correct_answer ? "answer correct" : "answer wrong");
        });

        delay(2000, () => {
            if (answer === correct_answer) {
                correctAnswer();
                delay(3000, () => {
                    setQuestionNumber((prev) => prev + 1);
                    setSelectedAnswer(null);
                    handleAnswer(answer);
                });

            } else {
                wrongAnswer();
                delay(3000, () => {
                    handleAnswer(answer);
                });


            }

        })
    };


    return (
        // Questionnaire main container
        <div className="questionnaire">

            {/* question container */}
            <div className="question">

                <h2
                    dangerouslySetInnerHTML={{ __html: question }}
                />

            </div>

            {/* answers container */}
            <div className='answers'>

                {answers.map((answer, idx) => {
                    return (
                        <button
                            key={idx}
                            dangerouslySetInnerHTML={{ __html: answer }}
                            className={selectedAnswer === answer ? className : "answer"}
                            onClick={() => !selectedAnswer && handleClick(answer)}
                        />
                    );
                })}

            </div>

        </div>
    );
};

export default Questionnaire;