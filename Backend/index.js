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
app.get("/test", (req, res)=> {
    const q = "select * from Test"
    db.query(q, (err, data) => {
        if(err) return res.json(err) 
        return res.json(data)
    })
})

app.post("/test", (req, res) => {
    const q = "insert into Test (`TestInt`, `TestString`) Values (?)"
    const values = [req.body.TestInt, req.body.TestString];
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})


app.listen(8080, ()=>{
    console.log("hello world")
})