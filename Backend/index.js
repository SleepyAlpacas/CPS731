import "dotenv/config"
import express from "express"
import mysql from "mysql2"
import cors from "cors"

const app = express()
app.use(express.json())


const db = mysql.createConnection({
    host:"cps731-cps731.c.aivencloud.com",
    user:"avnadmin",
    port:"28298",
    password: process.env.PASSWORD,
    database:"cps731"
})

app.use(cors())
app.get("/test", async (req, res)=> {
    const q = "select * from Test"
    return res.json(await querydb(q))
})

app.post("/test", async (req, res) => {
    const q = "insert into Test (`TestInt`, `TestString`) Values (?)"
    const values = [req.body.TestInt, req.body.TestString];
    return res.json(await querydbArgs(q, values));
})


async function querydb(query){
    let out;
    try{
        out = await db.promise().query(query);
    }
    catch(e){
        out = e
    }
    return out
}

async function querydbArgs (query, values){
    let out;
    console.log(values)
    try{
        out = await db.promise().query(query, [values])
    }
    catch(e){
        out = e;
    }
    return out
}

app.listen(8080, ()=>{
    console.log("hello world")
})