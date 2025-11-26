import { Link } from "react-router";
import NavBar from "./components/NavBar";
import { insertQuestion, deleteQuestion, createQuestion } from "./AdminFunctions";

function AdminQuestion() {


  function printInsertQuestionForm(){
    return (      <div className="card admin-section">
        <h2>Create Question</h2>

        <div className="form-group">
          <label>Question Text</label>
          <input type="text" id="question_text" />
        </div>

        <button
          className="btn-primary-link"
          onClick={() => insertQuestion(createQuestion())}
        >
          Insert Question
        </button>
      </div>)
  }

  function printDeleteQuestionForm(){
    return (      <div className="card admin-section">
        <h2>Delete Question</h2>

        <div className="form-group">
          <label>Question ID</label>
          <input type="number" id="question_id" />
        </div>

        <button className="btn-outline" onClick={deleteQuestion}>
          Delete Question
        </button>
      </div>)
  }


  return (
    <div className="page">
      <NavBar />

      {printInsertQuestionForm()}
      {printDeleteQuestionForm()}


      <Link to="/admin" className="back-link">
        ← Back
      </Link>
    </div>
  );
}
export default AdminQuestion;
