import "./App.css";
import React from "react";
import { useEffect, useState, useMemo } from 'react';
import { Questionnaire } from './components';

import Timer from "./components/Timer";
import Change from "./components/Change";


import Start from "./components/Start";
import Timesup from "./components/Timesup";
import DoubleTime from "./components/DoubleTime";



const apiUrl = "https://opentdb.com/api.php?amount=100";

const myName = "Tomer Vardi";
let currentYear = new Date().getFullYear();

function App() {

  //tracking if the user registered or not => if not -> showing welcome screen
  const [userName, setUserName] = useState(null);


  //tracking question number, current array and currIndex of question 
  //from fatched questions's array
  const [questions, setQuestions] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);


  //tracking current earn and game status => when gameOver = true -> game is end,
  // when time is out => the player need to press btn to continue
  const [earn, setEarn] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeOut, setTimeOut] = useState(false);
  const [timer, setTimer] = useState(30);



  // Timer and Life_Lines
  const [doubleTimeUsed, setDoubleTimeUsed] = useState(false);
  const [changeUsed, setChangeUsed] = useState(false);

  // const [fiftyFifty, setFiftyFifty] = useState(false);

  //Questions's earn values
  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: 100 },
        { id: 2, amount: 200 },
        { id: 3, amount: 300 },
        { id: 4, amount: 500 },
        { id: 5, amount: 1000 },
        { id: 6, amount: 2000 },
        { id: 7, amount: 4000 },
        { id: 8, amount: 8000 },
        { id: 9, amount: 16000 },
        { id: 10, amount: 32000 },

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
    //check for the answer
    if (answer === questions[currIndex].correct_answer) {
      //updating earn
      //need to decide how to end the game and update the earn calc
      setEarn(moneyPyramid[10 - questionNumber].amount + earn);
    }

    handleNextQuestion(true);

  };

  //lunching next question and stop showing corrrect answer
  const handleNextQuestion = (changeQuestion) => {
    if (questionNumber === 10) {
      setGameOver(true);
    }
    if (changeQuestion) {
      setQuestionNumber(questionNumber + 1);
    }
    //show another question
    setCurrIndex(currIndex + 1);
  }



  //rendering screens and 
  return !userName ?
    (

      <div className="startScreen">
        <header>
          <h1>Welcome to <span className="big">QUIZ TIME</span><br />an online quiz app</h1>
        </header>


        <Start setUsername={setUserName} />
        <footer>
          <p className="copyRight">Ⓒ Copyright, {myName} {currentYear}. </p></footer>
      </div>
    ) : (

      //checking if data already fetched => if not -> showing loading message
      questions.length > 0 ? (

        // Main app div
        <div className="app vh-100">

          <>

            {/* Main (Left) container: Top & Bottom containers, and if game is over => Over container  */}
            <div className="main col-9">
              {gameOver ? (

                <h1>Game over! <br /> <span className="big">{userName}</span> earn: ★ {earn} in total !</h1>

              ) : timeOut ? (


                //sadely i have an unfixed problem:
                //when player's time is up he needs to click the btn to continue the game
                //right now when he does, the state of the useState const - timeOut
                //change only by the 2nd click, what lead to another click and skiping a question
                //i read that it's because of some problem in react changing state 
                //and because Because setState() is an asynchronous function but wouldn't found a solution
                //so at this moment the player needs to click 2 times and he loses another question.

                <Timesup
                  userName={userName}
                  setTimeOut={setTimeOut}
                  timeOut={timeOut}
                  setGameOver={setGameOver}
                  questionNumber={questionNumber}
                  handleNextQuestion={handleNextQuestion}
                />
              ) : (

                <>

                  {/* Top container: Question#, Timer, LifeLines & QuitGame button  */}
                  <div className="top">

                    <div className="timer">

                      <Timer
                        setTimeOut={setTimeOut}
                        questionNumber={questionNumber}
                        timer={timer}
                        setTimer={setTimer}
                        changeUsed={changeUsed}
                      />

                    </div>

                    <div className="change">

                      <Change
                        changeUsed={changeUsed}
                        setChangeUsed={setChangeUsed}
                        handleNextQuestion={handleNextQuestion}
                      />

                    </div>

                    <div className="double">

                      <DoubleTime
                        doubleTimeUsed={doubleTimeUsed}
                        setDoubleTimeUsed={setDoubleTimeUsed}
                        timer={timer}
                        setTimer={setTimer}
                      />

                    </div>

                  </div>

                  {/* Bottom container: Questions & Answers container */}
                  <div className="bottom">

                    <Questionnaire
                      data={questions[currIndex]}
                      handleAnswer={handleAnswer}
                      setTimeOut={setTimeout}

                    />

                  </div>

                </>
              )}

            </div>

            {/* Pyramid (Right container): game progress & question's value */}
            <div className="pyramid col-3">

              <div className="moneyList vh-100">
                {moneyPyramid.map((m, idx) => (
                  <div
                    className={
                      questionNumber === m.id
                        ? "moneyListItem active row"
                        : "moneyListItem row"
                    }
                    key={idx}
                  >

                    {/* money pyramid div with seperation for Quest.# & amount */}


                    <div className="moneyListItemNumber col-3 d-flex align-items-center">
                      {m.id}
                    </div>

                    <div className="moneyListItemAmount col-9 d-flex align-items-center">
                      ★ {m.amount}
                    </div>

                  </div>



                ))}

              </div>

            </div>

          </>

        </div>

      ) : (
        <h2 className='big'>Loading...</h2>
      )//questions.length > 0 ?

    );//return

}//function App

export default App;
