import React from "react";
import axios from "axios";
import { Link } from "react-router";

function UserProfileModule(){
    const [loggedIn, setLoggedIn] = React.useState(null)
    const [username, setUsername] = React.useState(null)

    function checkLoggedIn(){
        const search = document.cookie.match(/account_id=\d+/)
        if (search) {
            setLoggedIn(search[0].split("=")[1]);
            return true
        }
        return false
    }

    function logout(){
        document.cookie = "account_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
        setUsername(null)
        setLoggedIn(null)
    }

    async function searchUser(userId){
        if (username == null) {
            const out = await axios.get(`http://localhost:8080/account/${userId}`)
            if (out.data[0].length == 1) {
                setUsername(out.data[0][0].account_username)
            }
        }
    }

    React.useEffect(() =>{
        if (checkLoggedIn()){
            searchUser(loggedIn)
        }
    })

    async function checkLogIn(){
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
        const out = await axios.get(`http://localhost:8080/account/${username}/${password}`)
        if (out.data[0].length) {
            setLoggedIn(true);
            console.log(out.data[0][0].account_id)
            document.cookie = `account_id=${out.data[0][0].account_id}`
        }
    }

    async function checkSignUp(){
        const username = document.getElementById("usernameSignUp").value
        const password = document.getElementById("passwordSignUp").value
        const account = {
            account_username: username,
            account_password: password,
            is_admin: false
        }
        const out = await axios.post(`http://localhost:8080/account`, account)
        console.log(typeof(out.data) != 'object')
        console.log(out.data)
        if (Array.isArray(out.data)) setLoggedIn(true)
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
            {   !loggedIn &&
                <form>
                    <label>Username</label>
                    <input type="text" id="usernameSignUp"/>
                    <label>Password</label>
                    <input type="password" id="passwordSignUp"/>
                    <input type="button" value={"signup"} onClick={checkSignUp}/>
                </form>
            }
            {loggedIn && <h1>You're logged in user: {username}</h1>}
            {loggedIn && <button onClick={logout}>Logout</button>}
            {loggedIn && <button><Link to={"/questionnairemodule"}>Questionnaire Module</Link></button>}           
        </>
    )
}
export default UserProfileModule