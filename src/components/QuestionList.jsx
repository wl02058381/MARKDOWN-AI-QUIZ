import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';

const QuestionList = ({ questions }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 每題 30 秒

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleConfirm(questions[currentQuestionIndex]?.id);
          return 30; // 重置時間
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

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
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="question-list">
      {currentQuestion && (
        <div className="question-item">
          <h3>{currentQuestion.question}</h3>
          <LinearProgress variant="determinate" value={(timeLeft / 30) * 100} />
          <div className="options">
            {currentQuestion.choices.map((option, idx) => (
              <label key={idx} className="choice">
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={option}
                  checked={selectedAnswers[currentQuestion.id] === option}
                  onChange={() => handleAnswerChange(currentQuestion.id, option)}
                />
                {option}
              </label>
            ))}
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleConfirm(currentQuestion.id)}
            sx={{ marginTop: 2 }}
          >
            確認
          </Button>
          {showResults[currentQuestion.id] && (
            <div className="result">
              <p><strong>Answer:</strong> {currentQuestion.answer}</p>
              <p><strong>Explanation:</strong> {currentQuestion.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionList;