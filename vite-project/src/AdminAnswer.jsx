import { Link } from "react-router";
import NavBar from "./components/NavBar";
import { createAnswer, insertAnswer, deleteAnswer} from "./AdminFunctions";

function AdminAnswer() {


  function printInsertAnswerForm(){
    return       (<div className="card admin-section">
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
      </div>)
  }


  function printDeleteAnswerForm(){
    return (      <div className="card admin-section">
        <h2>Delete Answer</h2>

        <div className="form-group">
          <label>Answer ID</label>
          <input type="number" id="answer_id" />
        </div>

        <button className="btn-outline" onClick={deleteAnswer}>
          Delete Answer
        </button>
      </div>)
  }

  return (
    <div className="page">
      <NavBar />

      {printInsertAnswerForm()}
      {printDeleteAnswerForm()}

      <Link to="/admin" className="back-link">
        ← Back
      </Link>
    </div>
  );
}
export default AdminAnswer;
