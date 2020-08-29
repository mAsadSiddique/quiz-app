import React, { useState } from 'react';
import {questionPropsType} from './../types/quiz_types';
const QuestionCards:React.FC<questionPropsType> = ({question, options, callback}) => {
    // console.log(question, options)
    // console.log(options)
    let [selectAns, setSelectAns] = useState("");

    const handleSelection = (ev: any)=>{
        // console.log(ev.target.value);
        setSelectAns(ev.target.value);
    }
    return (
        <div className="Question-container">
            <div className="question">
                <h4>{question}</h4>
            </div>
            <form onSubmit={(e: React.FormEvent<EventTarget>)=>callback(e, selectAns)}
            className="Question-form"
            >
                {
                    options.map((opt: string, ind: number)=>{
                        return(
                            <div key={ind}>
                                <label className="radio">
                                    <input
                                    type="radio"
                                    name="opt"
                                    value={opt}
                                    checked={selectAns === opt}
                                    onChange={handleSelection}
                                    required
                                    />
                                    {opt}
                                </label>
                            </div>
                        )
                    })
                }
                <input className="btn" type="submit" />
            </form>
        </div>
    )
}
export default QuestionCards;