import axios from "axios";

export function computeOutcome(outcomes, points) {
    for (const outcome of outcomes) {
        if (points >= outcome.min_score && points <= outcome.max_score) {
            return outcome;
        }
    }
}

export function createResult(outcome, points) {
    const account_id = document.cookie.match(/account_id=\d+/)[0].split("=")[1];
    const result = {
        account_id: account_id,
        outcome_id: outcome.outcome_id,
        score: points,
    };
    return result;
}

export async function saveResult(result) {
    const res = await axios.post("http://localhost:8080/result", result);
}

export function checkLoggedIn() {
    const search = document.cookie.match(/account_id=\d+/);
    if (search) return true
    return false
}

export async function getSetQuestions (setQuestions) {
    const res = await axios.get("http://localhost:8080/question");
    setQuestions(res.data[0]);
};

export async function getSetAnswers(setAnswers)  {
    const res = await axios.get("http://localhost:8080/answer");
    setAnswers(res.data[0]);
};

export async function getSetOutcomes (setOutcomes) {
    const res = await axios.get("http://localhost:8080/outcome");
    setOutcomes(res.data[0]);
};

