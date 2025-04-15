import React from 'react';

function AnswerChecker({ userAnswers, correctAnswers, questions }) {
  const checkAnswers = () => {
    return userAnswers.map((answer, index) => {
      const isCorrect = answer === correctAnswers[index];
      return {
        questionIndex: index,
        isCorrect,
        question: questions[index]?.question || '',
        userAnswer: answer,
        correctAnswer: correctAnswers[index],
        explanation: questions[index]?.explanation || '',
      };
    });
  };

  const results = checkAnswers();

  return (
    <div className="answer-checker">
      <h2>Answer Results</h2>
      <ul>
        {results.map((result) => (
          <li key={result.questionIndex} className={`result-item ${result.isCorrect ? 'correct' : 'incorrect'}`}>
            <h3>Question {result.questionIndex + 1}: {result.question}</h3>
            <p><strong>Your Answer:</strong> {result.userAnswer}</p>
            <p><strong>Correct Answer:</strong> {result.correctAnswer}</p>
            <p><strong>Explanation:</strong> {result.explanation}</p>
            <p className={`feedback ${result.isCorrect ? 'correct' : 'incorrect'}`}>
              {result.isCorrect ? 'Correct!' : 'Incorrect!'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnswerChecker;