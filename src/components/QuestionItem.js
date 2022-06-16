import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers?.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteClick(){
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(() => onDeleteQuestion(question))
  }

  function handleCorrectAnswerChange(event) {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "correctIndex": event.target.value
      })
    })
    .then(response => response.json())
    .then(updatedQuestion => onUpdateAnswer(updatedQuestion))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleCorrectAnswerChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDeleteClick} >Delete Question</button>
    </li>
  );
}

export default QuestionItem;
