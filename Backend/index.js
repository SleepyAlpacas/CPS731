import "dotenv/config"
import express from "express"
import mysql from "mysql2"
import cors from "cors"

const app = express()
app.use(express.json())

//establish db connection
const db = mysql.createConnection({
    host:"cps731-cps731.c.aivencloud.com",
    user:"avnadmin",
    port:"28298",
    password: process.env.PASSWORD,
    database:"cps731"
})

app.use(cors())

//server responses
app.get("/test", async (req, res)=> {
    const q = "select * from Test"
    return res.json(await querydb(q))
})

app.post("/test", async (req, res) => {
    const q = "insert into Test (`TestInt`, `TestString`) Values (?)"
    const values = [req.body.TestInt, req.body.TestString];
    return res.json(await querydbArgs(q, values));
})

app.get("/question", async(req, res) => {
    const q = "select * from question"
    return res.json(await querydb(q))
})
app.post("/question", async(req, res) => {
    const q = "insert into question (`question_text`) Values (?)"
    const values = [req.body.question_text]
    return res.json(await querydbArgs(q, values))
})

app.get("/answer", async(req, res) =>{
    const q = "select * from answer"
    return res.json(await querydb(q))
})
app.post("/answer", async(req, res) => {
    const q = "insert into answer (`question_id`, `answer_text`, `answer_points`) values (?)"
    const values = [req.body.question_id, req.body.answer_text, req.body.answer_points]
    return res.json(await querydbArgs(q, values))
})

//general function for a db query from js
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

//for db queries with VALUES parameter
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