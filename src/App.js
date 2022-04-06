import "./App.css";
import React from "react";
import { useEffect, useState, useMemo } from 'react';
import { Questionnaire } from './components';
import Timer from "./components/Timer";
import Start from "./components/Start";

const apiUrl = "https://opentdb.com/api.php?amount=100";

function App() {
  const [username, setUsername] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);
  const [earn, setEarn] = useState("$ 0");
  const [showAnswers, setShowAnswers] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeOut, setTimeOut] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [leadBoard, setLeadBoard] = useState([]);

  //Questions's earn values
  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "$ 100" },
        { id: 2, amount: "$ 200" },
        { id: 3, amount: "$ 300" },
        { id: 4, amount: "$ 500" },
        { id: 5, amount: "$ 1.000" },
        { id: 6, amount: "$ 2.000" },
        { id: 7, amount: "$ 4.000" },
        { id: 8, amount: "$ 8.000" },
        { id: 9, amount: "$ 16.000" },
        { id: 10, amount: "$ 32.000" },
        { id: 11, amount: "$ 64.000" },
        { id: 12, amount: "$ 125.000" },
        { id: 13, amount: "$ 250.000" },
        { id: 14, amount: "$ 500.000" },
        { id: 15, amount: "$ 1.000.000" },
      ].reverse(),
    []
  );

  //Fetching the questions's API, Creating current question array and mix it
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        //mapping fetched data and creating current question&answers array
        const questions = data.results.map((question) =>
        ({
          ...question,
          answers: [
            question.correct_answer,
            ...question.incorrect_answers,
          ].sort(() => Math.random() - 0.5),
        }))
        setQuestions(questions);
      });
  }, []);

  //handling answer: showing the correct answer & update the earn
  const handleAnswer = (answer) => {
    if (!showAnswers) {
      //prevent double answers
      //check for the answer
      if (answer === questions[currIndex].correct_answer) {
        //updating earn
        //need to decide how to end the game and update the earn calc
        setEarn(moneyPyramid[15-questionNumber].amount);
      }

    }
    setShowAnswers(true);
    handleNextQuestion();

  };

  //lunching next question and stop showing corrrect answer
  const handleNextQuestion = () => {
    if(questionNumber==15){
      setGameOver(true);
    }
    setQuestionNumber(questionNumber + 1);
    // setGameOver(true);
    setShowAnswers(false);
    //show another question
    setCurrIndex(currIndex + 1);
  }

  //rendering screen
  return questions.length > 0 ?
    (
      <div className="app">
      {/*need to fix game over cond.  */}
        {!username && !gameOver ? (
          <Start
          leadBoard={leadBoard} 
          setUsername={setUsername} />
        ) : (
          <>
            {/* Main (Left) container: Top & Bottom containers, and if game is over => Over container  */}
            <div className="main">

              {gameOver ? (
                <h1 className="gameOverText">Game over! You earn: {earn}!</h1>
              ) : (
                <>

                  {/* Top container: Question#, Timer, LifeLines & QuitGame button  */}
                  <div className="top">

                    <div className="timer">

                      30
                      {/* <Timer
                    setTimeOut={setTimeOut}
                    questionNumber={questionNumber}
                  /> */}

                    </div>

                  </div>

                  {/* Bottom container: Questions & Answers container */}
                  <div className="bottom">

                    <Questionnaire
                      data={questions[currIndex]}
                      showAnswers={showAnswers}
                      handleNextQuestion={handleNextQuestion}
                      handleAnswer={handleAnswer}

                      questionNumber={questionNumber}
                      setQuestionNumber={setQuestionNumber}
                      setTimeOut={setTimeout}

                      
                    />

                  </div>

                </>
              )}

            </div>

            {/* Pyramid (Right container): game progress & question's value */}
            <div className="pyramid">
              
              <ul className="moneyList">
                {moneyPyramid.map((m) => (
                  <li
                    className={
                      questionNumber === m.id
                        ? "moneyListItem active"
                        : "moneyListItem"
                    }>
                    <span className="moneyListItemNumber">{m.id}</span>
                    <span className="moneyListItemAmount">{m.amount}</span>
                  </li>
                ))}
              </ul>

            </div>

          </>

        )}

      </div>

    ) : (
      <h2 className='text-2xl text-white font-bold'>Loading...</h2>
    );
}

export default App;
