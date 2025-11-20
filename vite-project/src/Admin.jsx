import React from "react";
import axios from "axios";
import { Link } from "react-router";

function Admin(){
    const [loggedIn, setLoggedIn] = React.useState(false)

    async function checkLogIn(){
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
        const out = await axios.get(`http://localhost:8080/account/${username}/${password}`)
        if (out.data[0].length == 1 && out.data[0][0].is_admin == 1) setLoggedIn(true)
    }

    return(
        <>  {   !loggedIn &&
                <form>
                    <label>Username</label>
                    <input type="text" id="username"/>
                    <label>Password</label>
                    <input type="password" id="password"/>
                    <input type="button" value={"login"} onClick={checkLogIn}/>
                </form>
            }
            {loggedIn && <button><Link to={"/admin/answer"}>Answer Table</Link></button>}
            {loggedIn && <button><Link to={"/admin/question"}>Question Table</Link></button>}
        </>
    )
}
export default Admin