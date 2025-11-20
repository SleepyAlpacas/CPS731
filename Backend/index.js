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
app.delete("/question/:question_id", async(req, res) => {
    const q = `delete from question where question_id = ${req.params.question_id}`
    return res.json(await querydb(q))
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
app.delete("/answer/:answer_id", async(req, res) => {
    const q = `delete from answer where answer_id = ${req.params.answer_id}`
    console.log(q)
    return res.json(await querydb(q))
})


app.get("/account", async(req, res) =>{
    const q = "select * from account"
    return res.json(await querydb(q))
})
app.get("/account/:username/:password", async(req, res) =>{
    const q = `select * from account where account_username = '${req.params.username}' and account_password = '${req.params.password}'`
    console.log(q)
    return res.json(await querydb(q))
})
app.get("/account/:accountid", async(req, res) =>{
    const q = `select * from account where account_id = ${req.params.accountid}`
    return res.json(await querydb(q))
})
app.post("/account", async(req, res) =>{
    const q = "insert into account (`account_username`, `account_password`, `is_admin`) values (?)"
    const account = [req.body.account_username, req.body.account_password, req.body.is_admin]
    return res.json(await querydbArgs(q, account))
})

app.get("/outcome", async(req, res) =>{
    const q = "select * from outcome"
    return res.json(await querydb(q))
})
app.post("/outcome", async(req, res) => {
    const q = "insert into outcome (`title`, `description`, `min_score`, `max_score`) values (?)"
    const outcome = [req.body.title, req.body.description, req.body.min_score, req.body.max_score]
    return res.json(await querydbArgs(q, outcome))
})

app.get("/result", async(req, res) =>{
    const q = "select * from result"
    return res.json(await querydb(q))
})
app.get("/result/:accountid", async(req, res) => {
    const q = `select * from result where account_id = ${req.params.accountid}`
    return res.json(await querydb(q))
})
app.post("/result", async(req, res) => {
    const q = "insert into result (`account_id`, `outcome_id`, `score`) values (?)"
    const result = [req.body.account_id, req.body.outcome_id, req.body.score]
    return res.json(await querydbArgs(q, result))
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