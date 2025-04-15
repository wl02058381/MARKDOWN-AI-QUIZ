import React, { useState } from 'react';

const QuestionList = ({ questions }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState({});

  const handleAnswerChange = (questionId, option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleConfirm = (questionId) => {
    setShowResults((prev) => ({
      ...prev,
      [questionId]: true,
    }));
  };

  return (
    <div className="question-list">
      {questions.map((question, index) => (
        <div key={index} className="question-item">
          <h3>{question.question}</h3>
          <div className="options">
            {question.choices.map((option, idx) => (
              <label key={idx} className="choice">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={selectedAnswers[question.id] === option}
                  onChange={() => handleAnswerChange(question.id, option)}
                />
                {option}
              </label>
            ))}
          </div>
          <button
            className="confirm-button"
            onClick={() => handleConfirm(question.id)}
            style={{ backgroundColor: 'green', color: 'white', marginTop: '10px' }}
          >
            確認
          </button>
          {showResults[question.id] && (
            <div className="result">
              <p><strong>Answer:</strong> {question.answer}</p>
              <p><strong>Explanation:</strong> {question.explanation}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuestionList;