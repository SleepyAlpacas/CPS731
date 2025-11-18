import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";

function Admin(){
    return(
        <>
            <button><Link to={"/admin/answer"}>Answer Table</Link></button>
        </>
    )
}
export default Admin