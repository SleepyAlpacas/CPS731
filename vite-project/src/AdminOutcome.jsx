import { Link } from "react-router";
import NavBar from "./components/NavBar";
import { createOutcome, deleteOutcome, insertOutcome } from "./AdminFunctions";

function AdminOutcome() {


  function printInsertOutcomeForm(){
    return       (<div className="card admin-section">
        <h2>Create Outcome</h2>

        <div className="form-group">
          <label>Title</label>
          <input type="text" id="title" />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input type="text" id="description" />
        </div>

        <div className="form-group">
          <label>Minimum Score</label>
          <input type="number" id="min_score" />
        </div>

        <div className="form-group">
          <label>Maximum Score</label>
          <input type="number" id="max_score" />
        </div>

        <div className="action-row">
          <button
            className="btn-primary-link"
            onClick={() => insertOutcome(createOutcome())}
          >
            Insert Outcome
          </button>
        </div>
      </div>)
  }


  function printDeleteOutcomeForm(){
    return (      <div className="card admin-section">
        <h2>Delete Outcome</h2>

        <div className="form-group">
          <label>Outcome ID</label>
          <input type="number" id="outcome_id" />
        </div>

        <button className="btn-outline" onClick={deleteOutcome}>
          Delete Outcome
        </button>
      </div>)
  }

  return (
    <div className="page">
      <NavBar />

      {printInsertOutcomeForm()}
      {printDeleteOutcomeForm()}

      <Link to="/admin" className="back-link">
        ← Back
      </Link>
    </div>
  );
}
export default AdminOutcome;
