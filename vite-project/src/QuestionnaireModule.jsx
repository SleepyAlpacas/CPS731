import React from "react";
import axios from "axios";


function QuestionnaireModule(){

    const [questionNumber, setQuestionNumber] = React.useState(1)
    const [qreq, setqreq] = React.useState([]);
    const [areq, setareq] = React.useState([]);

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
        {qreq.map(question=>(
            <h1 key={question.question_id}> {question.question_text} </h1>
        ))}

        <form>
        {areq.map(answer=>(
            <input type="button" id={answer.answer_id} value={answer.answer_text} /> 
        ))}
        </form>
    </>)
}

export default QuestionnaireModule