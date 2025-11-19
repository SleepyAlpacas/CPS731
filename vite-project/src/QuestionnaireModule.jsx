import React from "react";
import axios from "axios";


function QuestionnaireModule(){

    const [questionNumber, setQuestionNumber] = React.useState(0)
    const [questions, setQuestions] = React.useState([]);
    const [outcomes, setOutcomes] = React.useState([]);
    const [answers, setAnswers] = React.useState([]);
    const [points, setPoints] = React.useState(0);

    //handler for answer buttons
    function answerButton(answerPoints){
        setPoints(points + answerPoints);
        setQuestionNumber(questionNumber + 1);
    }

    function printOutcome(){
        if (questionNumber >= questions.length){
            console.log("RESULTS")
            for(const outcome of outcomes){
                if (points >= outcome.min_score && points <= outcome.max_score){
                    return(<>
                        <h1>Results !!!</h1>
                        <h2>{outcome.title}</h2>
                        <p>{outcome.description}</p>
                    </>)
                }
            }
        }
    }

    //get all questions and answers from database
    React.useEffect(() =>{
        const getQuestions = async()=>{
            //const res = await axios.get("https://cps731.onrender.com/question");
            const res = await axios.get("http://localhost:8080/question");
            console.log(res.data);
            setQuestions(res.data[0])
        }

        const getAnswers = async()=>{
            //const res = await axios.get("https://cps731.onrender.com/answer")
            const res = await axios.get("http://localhost:8080/answer")
            console.log(res.data)
            setAnswers(res.data[0])
        }

        const getOutcomes = async()=>{
            const res = await axios.get("http://localhost:8080/outcome")
            console.log(res.data)
            setOutcomes(res.data[0])
        }

        getQuestions()
        getAnswers()
        getOutcomes()
    }, []);


    return (<>
        {questionNumber < questions.length &&
        questions.filter((question) => question.question_id == questions[questionNumber].question_id).map(question=>(
            <h1 key={question.question_id}> {question.question_text} </h1>
        ))}

        <form>
        {questionNumber < questions.length &&
        answers.filter((answer) => answer.question_id == questions[questionNumber].question_id).map(answer=>(
            <input type="button" key={answer.answer_id} value={answer.answer_text} onClick={() => {answerButton(answer.answer_points)}}/> 
        ))}
        </form>

        {printOutcome()}
        <h2>Points: {points}</h2>
    </>)
}

export default QuestionnaireModule