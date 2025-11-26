import { Link } from "react-router";
import NavBar from "./components/NavBar";
import { createAccount, deleteAccount, insertAccount } from "./AdminFunctions";

function AdminAccount() {


  function printInsertAccountForm(){
    return       (<div className="card admin-section">
        <h2>Create Account</h2>

        <div className="form-group">
          <label>Account Username</label>
          <input type="text" id="account_username" />
        </div>

        <div className="form-group">
          <label>Account Password</label>
          <input type="text" id="account_password" />
        </div>

        <div className="form-group">
          <label>Is Admin?</label>
          <select id="is_admin">
                <option value="0">no</option>
            <option value="1">yes</option>
          </select>
        </div>

        <div className="action-row">
          <button
            className="btn-primary-link"
            onClick={() => insertAccount(createAccount())}
          >
            Insert Account
          </button>
        </div>
      </div>)
  }


  function printDeleteAccountForm(){
    return (      <div className="card admin-section">
        <h2>Delete Account</h2>

        <div className="form-group">
          <label>Account ID</label>
          <input type="number" id="account_id" />
        </div>

        <button className="btn-outline" onClick={deleteAccount}>
          Delete Account
        </button>
      </div>)
  }

  return (
    <div className="page">
      <NavBar />

      {printInsertAccountForm()}
      {printDeleteAccountForm()}

      <Link to="/admin" className="back-link">
        ← Back
      </Link>
    </div>
  );
}
export default AdminAccount;
