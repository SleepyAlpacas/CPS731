import React from "react";
import axios from "axios";

function AdminQuestion(){

    const [serverResponse, setServerResponse] = React.useState([])


    function createQuestion(){
        const question_text = document.getElementById("question_text").value
        const question = {
            question_text: question_text
        }
        return question
    }

    async function insertQuestion(question){
        const res = await axios.post("https://cps731.onrender.com/question", question)
        console.log(res)
    }

    async function deleteQuestion(){
        const question_id = parseInt(document.getElementById("question_id").value)
        const res = await axios.delete(`http://localhost:8080/question/${question_id}`)
        console.log(res)
    }

    return(
        <>
            <form>
                <label>question_text</label>
                <input type="text" id="question_text"/>
                <input type="button" onClick={()=>{const question = createQuestion(); insertQuestion(question)}} value={"Insert"}/>
            </form>
            <form>
                <label>question_id</label>
                <input type="number" id="question_id"/>
                <input type="button" onClick={deleteQuestion} value={"Delete"}/>
            </form>
            <p>{serverResponse}</p>
        </>
    )
}
export default AdminQuestion