import React from "react";
import NavBar from "./components/NavBar";
import { computeOutcome, createResult, checkLoggedIn, getSetQuestions, getSetAnswers, getSetOutcomes, saveResult } from "./QuestionnaireModule";

function QuestionnaireModuleDisplay() {
  const [questionNumber, setQuestionNumber] = React.useState(0);
  const [questions, setQuestions] = React.useState([]);
  const [outcomes, setOutcomes] = React.useState([]);
  const [answers, setAnswers] = React.useState([]);
  const [points, setPoints] = React.useState(0);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [endOutcome, setEndOutcome] = React.useState(false);

  //handler for answer buttons
  //this function is not in QuestionnaireModule since it involves 9 local variables
  function answerButton(answerPoints) {
    setPoints(points + answerPoints);
    if (questionNumber >= questions.length - 1) {
      const outcome = computeOutcome(outcomes, points)
      setEndOutcome(outcome);
    }
    setQuestionNumber(questionNumber + 1);
  }

  function printQuestion() {
    if (loggedIn && !endOutcome) {
      const currentQuestion = questions.filter(
        (question) =>
          question.question_id == questions[questionNumber].question_id
      );
      const out = currentQuestion.map((question) => (
        <h1 key={question.question_id}> {question.question_text} </h1>
      ));
      return out;
    }
  }

  function printAnswer() {
    if (loggedIn && !endOutcome) {
      const currentAnswers = answers.filter(
        (answer) => answer.question_id == questions[questionNumber].question_id
      );
      const out = currentAnswers.map((answer) => (
        <input
          type="button"
          key={answer.answer_id}
          value={answer.answer_text}
          onClick={() => {
            answerButton(answer.answer_points);
          }}
        />
      ));
      return out;
    }
  }

  function printOutcome() {
    if (loggedIn && endOutcome) {
      const outcome = computeOutcome(outcomes, points);
      return (
        <>
          <h1>Results !!!</h1>
          <h2>{outcome.title}</h2>
          <p>{outcome.description}</p>
        </>
      );
    }
  }

  //get all questions, answers, and outcomes from database
  //also check that user is logged in before starting
  React.useEffect(() => {
    setLoggedIn(checkLoggedIn());
    
    getSetQuestions(setQuestions)
    getSetAnswers(setAnswers)
    getSetOutcomes(setOutcomes);
  }, []);

  //save result to db upon completion of questionnaire
  React.useEffect(() => {
    if (endOutcome){
        const result = createResult(endOutcome, points);
        saveResult(result)
    }
  }, [endOutcome]);

  return (
    <>
      <div className="page">
        <NavBar />
        <div className="card">
          {printQuestion()}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {printAnswer()}
          </div>
        </div>

        {printOutcome()}
        {loggedIn && <p>Points: {points}</p>}
        {!loggedIn && <h2>Not Logged In</h2>}
      </div>
    </>
  );
}

export default QuestionnaireModuleDisplay;
