import React, { useEffect, useState } from 'react';
import './App.css';
import { quizDetails } from './Services/quiz_services';
import { quizType } from './types/quiz_types';
import QuestionCards from './Components/questionsCards';
import Timer from './Components/setTime';
function App() {

  let [quiz, setQuiz] = useState<quizType[]>([]);
  let [result, setResult] = useState(false);
  let [score, setScore] = useState(0);
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
    let questionAnswer:quizType = quiz[currentStep];
      console.log("User Answer: " + userAnswer + " Correct Answer: " + questionAnswer.correct_answer)
      if(userAnswer === questionAnswer.correct_answer){
        setScore(++score);
      }
        if (currentStep !== quiz.length - 1){
          setCurrentStep(++currentStep);
        }
        else {
          // alert("Your Final Score is " + score+ "  Out of" + quiz.length);
          console.log(setResult(true));
        }
  }


    const handleRestart = (ev: any)=>{
      // console.log(setResult(false));
      setResult(false);
      setCurrentStep(0);
      setScore(0);
    }
    if(result){
      // setResult(false);
      return(
        <div className="Question-container">
          <h3 className="result">{score}/{quiz.length}</h3>
          <button className="restart-btn" onClick={handleRestart}>Restart</button>
        </div>
      )
    }
    console.log(Timer);
    if (!quiz.length)
    return <h3>Loading...</h3>

  return (
    <div className="App">
      <h1 className="head">Quiz Application </h1>
      <Timer/>
      <h4 className="solved-question">Questions:  {currentStep}/{quiz.length}</h4>
      <QuestionCards
        options={quiz[currentStep].option}
        question={quiz[currentStep].question}
        callback={handleSubmit}
      />
    </div>
  );
}

export default App;
