import React from "react";
import axios from "axios";
import { Link } from "react-router";

function Admin(){
    const [loggedIn, setLoggedIn] = React.useState(false)

    async function checkLogIn(){
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
        const out = await axios.get(`http://localhost:8080/account/${username}/${password}`)
        if (out.data[0] && out.data[0][0].is_admin == 1) {
            setLoggedIn(true)
            document.cookie = `account_id=${out.data[0][0].account_id}`
        }
    }

    function logout(){
        document.cookie = "account_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
        setLoggedIn(false)
    }

    React.useEffect(() =>{
        const checkUserLoggedIn = async (userId) =>{
            if (!loggedIn) {
                const out = await axios.get(`http://localhost:8080/account/${userId}`)
                if (out.data[0] && out.data[0][0].is_admin == 1) {
                    setLoggedIn(true)
                }
            }
        }

        const userId = document.cookie.match(/account_id=\d+/)
        if (userId){
            checkUserLoggedIn(userId[0].split("=")[1])
        }
    }, [])

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
            {loggedIn && <button onClick={logout}>Log Out</button>}
        </>
    )
}
export default Admin