import React from "react";
import axios from "axios";


function QuestionnaireModule(){

    const [questionNumber, setQuestionNumber] = React.useState(0)
    const [questions, setQuestions] = React.useState([]);
    const [outcomes, setOutcomes] = React.useState([]);
    const [answers, setAnswers] = React.useState([]);
    const [points, setPoints] = React.useState(0);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [questionnaireEnd, setQuestionnaireEnd] = React.useState(false);

    function checkLoggedIn(){
        if (loggedIn == false){
            const search = document.cookie.match(/account_id=\d+/)
            if (search) setLoggedIn(true)
        }
    }

    //handler for answer buttons
    function answerButton(answerPoints){
        setPoints(points + answerPoints);
        setQuestionNumber(questionNumber + 1);
    }

    function printOutcome(){
        if (loggedIn && questionNumber >= questions.length){
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

    function printQuestion(){
        if (loggedIn && questionNumber < questions.length){
            const currentQuestion = questions.filter(question => question.question_id == questions[questionNumber]. question_id)
            const out = currentQuestion.map(question=>(
                <h1 key={question.question_id}> {question.question_text} </h1>
            ))
            return out
        }
    }

    function printAnswer(){
        if (loggedIn && questionNumber < questions.length){
            const currentAnswers = answers.filter(answer => answer.question_id == questions[questionNumber].question_id)
            const out = currentAnswers.map(answer=>(
                <input type="button" key={answer.answer_id} value={answer.answer_text} onClick={() => {answerButton(answer.answer_points)}}/> 
            ))
            return out
        }
    }

    //get all questions and answers from database
    React.useEffect(() =>{
        const getQuestions = async()=>{
            if (!questions.length){
                //const res = await axios.get("https://cps731.onrender.com/question");
                const res = await axios.get("http://localhost:8080/question");
                console.log(res.data);
                setQuestions(res.data[0])
            }
        }

        const getAnswers = async()=>{
            if (!answers.length){
                //const res = await axios.get("https://cps731.onrender.com/answer")
                const res = await axios.get("http://localhost:8080/answer")
                console.log(res.data)
                setAnswers(res.data[0])
            }
        }

        const getOutcomes = async()=>{
            if (!outcomes.length){
                const res = await axios.get("http://localhost:8080/outcome")
                console.log(res.data)
                setOutcomes(res.data[0])
            }
        }

        checkLoggedIn()
        getQuestions()
        getAnswers()
        getOutcomes()
    }, []);


    return (<>
        {printQuestion()}

        <form>
        {printAnswer()}
        </form>

        {printOutcome()}
        {loggedIn && <h2>Points: {points}</h2>}
        {!loggedIn && <h1>Not Logged In !!!</h1>}
    </>)
}

export default QuestionnaireModule