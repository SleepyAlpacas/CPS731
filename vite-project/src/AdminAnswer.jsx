import React from "react";
import axios from "axios";
import { Link } from "react-router";

function AdminAnswer() {
  const [serverResponse, setServerResponse] = React.useState([]);

  function createAnswer() {
    const question_id = parseInt(document.getElementById("question_id").value);
    const answer_text = document.getElementById("answer_text").value;
    const answer_points = parseInt(
      document.getElementById("answer_points").value
    );
    const answer = {
      question_id: question_id,
      answer_text: answer_text,
      answer_points: answer_points,
    };
    return answer;
  }

  async function insertAnswer(answer) {
    const res = await axios.post("https://cps731.onrender.com/answer", answer);
    console.log(res);
  }

  async function deleteAnswer() {
    const answer_id = parseInt(document.getElementById("answer_id").value);
    const res = await axios.delete(`http://localhost:8080/answer/${answer_id}`);
    console.log(res);
  }

  return (
    // <>
    //     <form>
    //         <label>question_id</label>
    //         <input type="number" id="question_id"/>
    //         <label>answer_text</label>
    //         <input type="text" id="answer_text"/>
    //         <label>answer_points</label>
    //         <input type="number" id="answer_points"/>
    //         <input type="button" onClick={()=>{const answer = createAnswer(); insertAnswer(answer)}} value={"Insert"}/>
    //     </form>
    //     <form>
    //         <label>answer_id</label>
    //         <input type="number" id="answer_id"/>
    //         <input type="button" onClick={deleteAnswer} value={"Delete"}/>
    //     </form>
    //     <p>{serverResponse}</p>
    //     <button><Link to={"/admin"}>Back</Link></button>
    // </>
    <div className="page">
      <div className="card admin-section">
        <h2>Create Answer</h2>

        <div className="form-group">
          <label>Question ID</label>
          <input type="number" id="question_id" />
        </div>

        <div className="form-group">
          <label>Answer Text</label>
          <input type="text" id="answer_text" />
        </div>

        <div className="form-group">
          <label>Points</label>
          <input type="number" id="answer_points" />
        </div>

        <div className="action-row">
          <button
            className="btn-primary-link"
            onClick={() => insertAnswer(createAnswer())}
          >
            Insert Answer
          </button>
        </div>
      </div>

      <div className="card admin-section">
        <h2>Delete Answer</h2>

        <div className="form-group">
          <label>Answer ID</label>
          <input type="number" id="answer_id" />
        </div>

        <button className="btn-outline" onClick={deleteAnswer}>
          Delete Answer
        </button>
      </div>

      <Link to="/admin" className="back-link">
        ← Back
      </Link>
    </div>
  );
}
export default AdminAnswer;
