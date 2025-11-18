import React from "react";
import axios from "axios";


function QuestionnaireModule(){

    const [questionNumber, setQuestionNumber] = React.useState(1)
    const [qreq, setqreq] = React.useState([]);
    const [areq, setareq] = React.useState([]);
    const [points, setPoints] = React.useState(0);

    function answerButton(answerPoints){
        setPoints(points + answerPoints);
        setQuestionNumber(questionNumber + 1);
    }

    React.useEffect(() =>{
        const getQuestions = async()=>{
            //const res = await axios.get("https://cps731.onrender.com/test");
            const res = await axios.get("http://localhost:8080/question");
            console.log(res.data);
            setqreq(res.data[0])
        }

        const getAnswers = async()=>{
            const res = await axios.get("http://localhost:8080/answer")
            console.log(res.data)
            setareq(res.data[0])
        }

        getQuestions()
        getAnswers()
    }, []);



    return (<>
        {qreq.filter((question) => question.question_id == questionNumber).map(question=>(
            <h1 key={question.question_id}> {question.question_text} </h1>
        ))}

        <form>
        {areq.filter((answer) => answer.question_id == questionNumber).map(answer=>(
            <input type="button" id={answer.answer_id} value={answer.answer_text} onClick={() => answerButton(answer.answer_points)}/> 
        ))}
        </form>
        <h2>Points: {points}</h2>
    </>)
}

export default QuestionnaireModule