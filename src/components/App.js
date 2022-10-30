import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    const res = await fetch("http://localhost:4000/questions");
    const data = await res.json();
    setQuestions(data);
  };

  const addQuestion = async (question) => {
    const res = await fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    });
    const data = await res.json();
    setQuestions([...questions, data]);
  };

  const deleteQuestion = async (id) => {
    await fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    });
    setQuestions(questions.filter((question) => question.id !== id));
  };

  const updateQuestion = async (question) => {
    const res = await fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    });
    const data = await res.json();
    setQuestions(
      questions.map((question) =>
        question.id === data.id ? { ...question, ...data } : question
      )
    );
  };

  useEffect(() => fetchQuestions(), []);

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />

      {page === "Form" ? (
        <QuestionForm onAddQuestion={addQuestion} onChangePage={setPage} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={deleteQuestion}
          onUpdateQuestion={updateQuestion}
        />
      )}
    </main>
  );
}

export default App;
