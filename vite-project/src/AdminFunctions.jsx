import axios from "axios"

//answers section
export function createAnswer() {
    const question_id = parseInt(document.getElementById("question_id").value);
    const answer_text = document.getElementById("answer_text").value;
    const answer_points = parseInt(
        document.getElementById("answer_points").value
    );
    const answer = {
        question_id: question_id,
        answer_text: answer_text,
        answer_points: answer_points,
    };
    return answer;
}

export async function insertAnswer(answer) {
    const res = await axios.post("https://cps731.onrender.com/answer", answer);
    console.log(res);
}

export async function deleteAnswer() {
    const answer_id = parseInt(document.getElementById("answer_id").value);
    const res = await axios.delete(`http://localhost:8080/answer/${answer_id}`);
    console.log(res)
}


//questions section
export function createQuestion() {
    const question_text = document.getElementById("question_text").value;
    const question = {
      question_text: question_text,
    };
    return question;
}

export async function insertQuestion(question) {
    const res = await axios.post(
      "https://cps731.onrender.com/question",
      question
    );
    console.log(res);
}

export async function deleteQuestion() {
    const question_id = parseInt(document.getElementById("question_id").value);
    const res = await axios.delete(
        `http://localhost:8080/question/${question_id}`
    );
    console.log(res);
}

//account section
export function createAccount(){
    const account_username = document.getElementById("account_username").value
    const account_password = document.getElementById("account_password").value
    const is_admin = document.getElementById("is_admin").value

    const account = {
        account_username: account_username,
        account_password: account_password,
        is_admin: is_admin
    }

    return account
}

export async function insertAccount(account){
    const res = await axios.post("http://localhost:8080/account", account)
    return res
}

export async function deleteAccount(){
    const account_id = document.getElementById("account_id").value
    const res = await axios.delete(`http://localhost:8080/account/${account_id}`)
    return res
}