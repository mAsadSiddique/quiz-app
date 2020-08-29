import { Quiz , quizType } from '../types/quiz_types';


const shuffleArray = (array: any[]) =>
[ ...array].sort(()=> Math.random() -0.5)

export const quizDetails = async (totalQuestion: Number, level: string): Promise<quizType[]> => {
    const response = await fetch(`https://opentdb.com/api.php?amount=${totalQuestion}&difficulty=${level}`)
    let { results } = await response.json()
    // console.log(results);
    const quiz:quizType[] = results.map((QuestionObj: Quiz, ind: number) => {
        return {
            question: QuestionObj.question,
            answer: QuestionObj.correct_answer,
            correct_answer: QuestionObj.correct_answer,
            option: shuffleArray(QuestionObj.incorrect_answers.concat(QuestionObj.correct_answer)),
        }
    })
    // console.log(data)
    return quiz;
}