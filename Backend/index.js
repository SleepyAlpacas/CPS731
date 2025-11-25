import "dotenv/config";
import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "cps731-cps731.c.aivencloud.com",
  user: "avnadmin",
  port: "28298",
  password: process.env.PASSWORD,
  database: "cps731",
});

// general function for a db query from js
async function querydb(query) {
  let out;
  try {
    out = await db.promise().query(query);
  } catch (e) {
    out = e;
  }
  return out;
}

// for db queries with VALUES parameter
async function querydbArgs(query, values) {
  let out;
  console.log(values);
  try {
    out = await db.promise().query(query, [values]);
  } catch (e) {
    out = e;
  }
  return out;
}

// System Objects (OOP)

// Test table
export class Test {

  constructor(TestInt, TestString) {
    this.TestInt = TestInt;
    this.TestString = TestString;
  }

  static async getAll() {
    const q = "select * from Test";
    return await querydb(q);
  }

  static async create(testInt, testString) {
    const q = "insert into Test (`TestInt`, `TestString`) Values (?)";
    const values = [testInt, testString];
    return await querydbArgs(q, values);
  }
}

// Question table

export class Question {
  constructor(question_id, question_text) {
    this.question_id = question_id;
    this.question_text = question_text;
  }

  static async getAll() {
    const q = "select * from question";
    return await querydb(q);
  }

  static async create(questionText) {
    const q = "insert into question (`question_text`) Values (?)";
    const values = [questionText];
    return await querydbArgs(q, values);
  }

  static async deleteById(questionId) {
    const q = `delete from question where question_id = ${questionId}`;
    return await querydb(q);
  }
}

// Answer table

export class Answer {

  constructor(answer_id, question_id, answer_text, answer_points) {
    this.answer_id = answer_id;
    this.question_id = question_id;
    this.answer_text = answer_text;
    this.answer_points = answer_points;
  }

  static async getAll() {
    const q = "select * from answer";
    return await querydb(q);
  }

  static async create(questionId, answerText, answerPoints) {
    const q =
      "insert into answer (`question_id`, `answer_text`, `answer_points`) values (?)";
    const values = [questionId, answerText, answerPoints];
    return await querydbArgs(q, values);
  }

  static async deleteById(answerId) {
    const q = `delete from answer where answer_id = ${answerId}`;
    console.log(q);
    return await querydb(q);
  }
}

// Account table
export class Account {

  constructor(account_id, account_username, account_password, is_admin) {
    this.account_id = account_id;
    this.account_username = account_username;
    this.account_password = account_password;
    this.is_admin = is_admin;
  }

  static async getAll() {
    const q = "select * from account";
    return await querydb(q);
  }

  static async getByUsernameAndPassword(username, password) {
    const q = `select * from account where account_username = '${username}' and account_password = '${password}'`;
    console.log(q);
    return await querydb(q);
  }

  static async getById(accountId) {
    const q = `select * from account where account_id = ${accountId}`;
    return await querydb(q);
  }

  static async create(username, password, isAdmin) {
    const q =
      "insert into account (`account_username`, `account_password`, `is_admin`) values (?)";
    const account = [username, password, isAdmin];
    return await querydbArgs(q, account);
  }
}

// Outcome table
export class Outcome {

  constructor(outcome_id, title, description, min_score, max_score) {
    this.outcome_id = outcome_id;
    this.title = title;
    this.description = description;
    this.min_score = min_score;
    this.max_score = max_score;
  }

  static async getAll() {
    const q = "select * from outcome";
    return await querydb(q);
  }

  static async create(title, description, minScore, maxScore) {
    const q =
      "insert into outcome (`title`, `description`, `min_score`, `max_score`) values (?)";
    const outcome = [title, description, minScore, maxScore];
    return await querydbArgs(q, outcome);
  }
}

// Result table
export class Result {

  constructor(result_id, account_id, outcome_id, score) {
    this.result_id = result_id;
    this.account_id = account_id;
    this.outcome_id = outcome_id;
    this.score = score;
  }

  static async getAll() {
    const q = "select * from result";
    return await querydb(q);
  }

  static async getByAccountId(accountId) {
    const q = `select * from result where account_id = ${accountId}`;
    return await querydb(q);
  }

  static async create(accountId, outcomeId, score) {
    const q =
      "insert into result (`account_id`, `outcome_id`, `score`) values (?)";
    const result = [accountId, outcomeId, score];
    return await querydbArgs(q, result);
  }
}

// API routes

// Test routes
app.get("/test", async (req, res) => {
  return res.json(await Test.getAll());
});

app.post("/test", async (req, res) => {
  const { TestInt, TestString } = req.body;
  return res.json(await Test.create(TestInt, TestString));
});

// Question routes
app.get("/question", async (req, res) => {
  return res.json(await Question.getAll());
});

app.post("/question", async (req, res) => {
  return res.json(await Question.create(req.body.question_text));
});

app.delete("/question/:question_id", async (req, res) => {
  return res.json(await Question.deleteById(req.params.question_id));
});

// Answer routes
app.get("/answer", async (req, res) => {
  return res.json(await Answer.getAll());
});

app.post("/answer", async (req, res) => {
  const { question_id, answer_text, answer_points } = req.body;
  return res.json(
    await Answer.create(question_id, answer_text, answer_points)
  );
});

app.delete("/answer/:answer_id", async (req, res) => {
  return res.json(await Answer.deleteById(req.params.answer_id));
});

// Account routes
app.get("/account", async (req, res) => {
  return res.json(await Account.getAll());
});

app.get("/account/:username/:password", async (req, res) => {
  const { username, password } = req.params;
  return res.json(
    await Account.getByUsernameAndPassword(username, password)
  );
});

app.get("/account/:accountid", async (req, res) => {
  return res.json(await Account.getById(req.params.accountid));
});

app.post("/account", async (req, res) => {
  const { account_username, account_password, is_admin } = req.body;
  return res.json(
    await Account.create(account_username, account_password, is_admin)
  );
});

// Outcome routes
app.get("/outcome", async (req, res) => {
  return res.json(await Outcome.getAll());
});

app.post("/outcome", async (req, res) => {
  const { title, description, min_score, max_score } = req.body;
  return res.json(
    await Outcome.create(title, description, min_score, max_score)
  );
});

// Result routes
app.get("/result", async (req, res) => {
  return res.json(await Result.getAll());
});

app.get("/result/:accountid", async (req, res) => {
  return res.json(await Result.getByAccountId(req.params.accountid));
});

app.post("/result", async (req, res) => {
  const { account_id, outcome_id, score } = req.body;
  return res.json(
    await Result.create(account_id, outcome_id, score)
  );
});

app.listen(8080, () => {
  console.log("hello world");
});