import React, {useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, setQuestions}) {
  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(response => response.json())
    .then(questions => setQuestions(questions))
  }, []);

  function handleDeleteQuestion(deletedQuestion) {
    const updatedQuestions = questions.filter(question => {
      return question.id !== deletedQuestion.id;
    });

    setQuestions(updatedQuestions);
  }

  function handleAnswerUpdate(updatedQuestion) {
    const updatedQuestions = questions.map(question => {
      if (updatedQuestion.id === question.id) {
        return updatedQuestion;
      } else {
        return true;
      }
    });

    setQuestions(updatedQuestions);
  }

  const renderQuestions = questions.map(question => {
    return <QuestionItem 
              key={question.id} 
              question={question}
              onDeleteQuestion={handleDeleteQuestion}
              onUpdateAnswer={handleAnswerUpdate}
            />
  });
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{renderQuestions}</ul>
    </section>
  );
}

export default QuestionList;