import React, {  Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import './App.css';
import { quizDetails } from './Services/quiz_services';
import { quizType } from './types/quiz_types';
import QuestionCards from './Components/questionsCards';

function App() {

  let [quiz, setQuiz] = useState<quizType[]>([]);
  let [result, setResult] = useState(false);
  let [score, setScore] = useState<number>(0);
  let [currentStep, setCurrentStep] = useState(0);
  // const [timeInseconds, setTimeInseconds] = useState<number>(0);
  // const [timeArray, setTimeArray] = useState<Array<number | string>>([]);
  // const [intervalId, setIntervalId] = useState<number>(0);


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


  // function calculateTime(timeInseconds: number): Array<number | string> {
  //   let hours: number = Math.floor(timeInseconds / 3600);
  //   let minutes: number = Math.floor((timeInseconds - (hours * 3600)) / 60);
  //   let seconds: number = timeInseconds - (minutes * 60);

  //   let modifiedMinutes = minutes > 10 ? minutes : `0${minutes}`;
  //   let modifiedSeconds = seconds > 10 ? minutes : `0${minutes}`;

  //   return [
  //     modifiedMinutes,
  //     modifiedSeconds
  //   ]
  // }

  // useEffect(() => {

  //   const timeArray: Array<number | string> = calculateTime(timeInseconds);
  //   console.log("Time Array",timeArray)

  //   setTimeArray(timeArray);

  // }, [timeInseconds])

  // const handleTime = () => {
  //   let interval: any = setInterval(() => {
  //     setTimeInseconds((previousState: number) =>
  //       previousState + 1);
  //   }, 1000)

  //   setIntervalId(interval);
  // }
  // handleTime()



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

      {/* <button onClick={handleTime}>Start Quiz</button> */}

      <Helmet>
        <title>Quiz App</title>
      </Helmet>


      <div className="App">
        <h1 className="head">Quiz App</h1>
        <div className="sub__head">
          <span>
            <h3>Questions:  {currentStep}/{quiz.length}</h3></span>
          {/* <span><h3>{timeArray[0]}:{timeArray[1]}</h3></span> */}
        </div>

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
