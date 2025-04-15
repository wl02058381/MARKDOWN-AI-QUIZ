import React from 'react';
import Button from '@mui/material/Button';
import { saveAs } from 'file-saver';

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

  const handleDownloadResults = () => {
    const results = checkAnswers();
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    saveAs(blob, 'quiz-results.json');
  };

  const results = checkAnswers();
  const totalQuestions = results.length;
  const correctCount = results.filter((result) => result.isCorrect).length;
  const accuracy = ((correctCount / totalQuestions) * 100).toFixed(2);

  return (
    <div className="answer-checker">
      <h2>測驗結果</h2>
      <p><strong>總題數：</strong> {totalQuestions}</p>
      <p><strong>正確題數：</strong> {correctCount}</p>
      <p><strong>正確率：</strong> {accuracy}%</p>
      <ul>
        {results.map((result) => (
          <li key={result.questionIndex} className={`result-item ${result.isCorrect ? 'correct' : 'incorrect'}`}>
            <h3>題目 {result.questionIndex + 1}: {result.question}</h3>
            <p><strong>您的答案：</strong> {result.userAnswer}</p>
            <p><strong>正確答案：</strong> {result.correctAnswer}</p>
            <p><strong>解釋：</strong> {result.explanation}</p>
            <p className={`feedback ${result.isCorrect ? 'correct' : 'incorrect'}`}>
              {result.isCorrect ? '正確！' : '錯誤！'}
            </p>
          </li>
        ))}
      </ul>
      <Button
        variant="contained"
        color="primary"
        onClick={handleDownloadResults}
        sx={{ marginTop: 2 }}
      >
        下載測驗結果
      </Button>
    </div>
  );
}

export default AnswerChecker;