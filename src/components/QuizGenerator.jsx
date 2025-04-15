import React, { useState } from 'react';
import { generateQuestions } from '../utils/aiQuestionGenerator';
// import './QuizGenerator.css'; // 引入樣式檔案

function QuizGenerator({ markdownContent }) {
  const [questionCount, setQuestionCount] = useState(5);
  const [difficulty, setDifficulty] = useState('medium');
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleGenerateQuestions = async () => {
    try {
      const generatedQuestions = await generateQuestions(markdownContent, questionCount, difficulty);
      setQuestions(generatedQuestions);
    } catch (error) {
      console.error('Error generating questions:', error);
      alert('Failed to generate questions. Please try again.');
    }
  };

  const handleAnswerChange = (questionIndex, choice) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: choice,
    }));
  };

  return (
    <div className="quiz-generator">
      <h2>Quiz Generator</h2>
      <div className="settings">
        <label>
          Number of Questions:
          <input
            type="number"
            value={questionCount}
            onChange={(e) => setQuestionCount(e.target.value)}
            min="1"
          />
        </label>
        <label>
          Difficulty:
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
      </div>
      <button onClick={handleGenerateQuestions}>Generate Questions</button>
      <div className="questions">
        {questions.length > 0 && (
          <ul>
            {questions.map((questionObj, index) => (
              <li key={index} className="question-item">
                <h3>Question {index + 1}: {questionObj.question}</h3>
                <div className="choices">
                  {questionObj.choices.map((choice, choiceIndex) => (
                    <label key={choiceIndex} className="choice">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={choice}
                        checked={selectedAnswers[index] === choice}
                        onChange={() => handleAnswerChange(index, choice)}
                      />
                      {choice}
                    </label>
                  ))}
                </div>
                <p><strong>Answer:</strong> {questionObj.answer}</p>
                <p><strong>Explanation:</strong> {questionObj.explanation}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default QuizGenerator;