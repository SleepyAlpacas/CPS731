import React from "react";
import { useEffect } from "react";
import axios from "axios";

function AdminAnswer(){

    const [serverResponse, setServerResponse] = React.useState([])

    async function submitAnswer(){
        question_id = parseInt(document.getElementById("question_id").value)
        answer_text = document.getElementById("answer_text").value
        answer_points = parseInt(document.getElementById("answer_points").value)
        const answer = {
            question_id: question_id,
            answer_text: answer_text,
            answer_points: answer_points
        }
        console.log(answer)
        let res;
        try{
            res = await axios.post("https://cps731.onrender.com/answer", answer)
        }
        catch(e){
            console.log(e)
        }
        console.log(res)
        //setServerResponse(res)
        
    }
    return(
        <>
            <form>
                <label>question_id</label>
                <input type="number" id="question_id"/>
                <label>answer_text</label>
                <input type="text" id="answer_text"/>
                <label>answer_points</label>
                <input type="number" id="answer_points"/>
                <input type="button" onClick={submitAnswer} value={"submit"}/>
            </form>
            <p>{serverResponse}</p>
        </>
    )
}
export default AdminAnswer