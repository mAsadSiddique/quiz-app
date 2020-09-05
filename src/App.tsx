import React, { Component, Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import './App.css';
import { quizDetails } from './Services/quiz_services';
import { quizType } from './types/quiz_types';
import QuestionCards from './Components/questionsCards';
import Timer from './Components/setTime';

function App() {

  let [quiz, setQuiz] = useState<quizType[]>([]);
  let [result, setResult] = useState(false);
  let [score, setScore] = useState<number>(0);
  let [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const Questions: quizType[] = await quizDetails(5, 'easy');
      console.log(Questions);
      setQuiz(Questions);
    }
    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent<EventTarget>, userAnswer: string) => {
    e.preventDefault();
    let questionAnswer: quizType = quiz[currentStep];
    console.log("User Answer: " + userAnswer + " Correct Answer: " + questionAnswer.correct_answer)
    if (userAnswer === questionAnswer.correct_answer) {
      setScore(++score);
    }
    if (currentStep !== quiz.length - 1) {
      setCurrentStep(++currentStep);
    }
    else {
      // alert("Your Final Score is " + score+ "  Out of" + quiz.length);
      // console.log(setResult(true));
      setResult(true)
    }
  }


  /////////////////////////////////////////////////////////
  const handleRestart = (ev: any) => {
    // console.log(setResult(false));
    setResult(false);
    setCurrentStep(0);
    setScore(0);
  }

  if (result) {
    return (

      <div className="Question-container">
        <Helmet>
          <title>Quiz Completed</title>
        </Helmet>
        <h3 className="result">{score}/{quiz.length}</h3>
        <button className="restart-btn" onClick={handleRestart}>Restart</button>
      </div>
    )
  }

  if (!quiz.length)
    return <h3>Loading...</h3>

  return (
    <Fragment>
      <Helmet>
        <title>Quiz App</title>
      </Helmet>
      <Timer
      scores={score}
      />
      <div className="App">
        <h1 className="head">Quiz App</h1>
        <h4 className="solved-question">Questions:  {currentStep}/{quiz.length}</h4>
        <QuestionCards
          options={quiz[currentStep].option}
          question={quiz[currentStep].question}
          callback={handleSubmit}
        />
      </div>
    </Fragment>
  );
}

export default App;
