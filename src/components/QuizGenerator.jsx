import React, { useState } from 'react';
import { generateQuestions } from '../utils/aiQuestionGenerator';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function QuizGenerator({ markdownContent }) {
  const [questionCount, setQuestionCount] = useState(5);
  const [difficulty, setDifficulty] = useState('medium');
  const [category, setCategory] = useState('general');
  const [questions, setQuestions] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleGenerateQuestions = async () => {
    try {
      const generatedQuestions = await generateQuestions(markdownContent, questionCount, difficulty, category);
      setQuestions(generatedQuestions);
      setPreviewMode(false);
    } catch (error) {
      console.error('Error generating questions:', error);
      alert('產生題目失敗，請再試一次。');
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
      <h2>題目產生器</h2>
      <div className="settings">
        <TextField
          label="題目數量"
          type="number"
          value={questionCount}
          onChange={(e) => setQuestionCount(e.target.value)}
          inputProps={{ min: 1 }}
          variant="outlined"
          fullWidth
        />
        <Select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          displayEmpty
          fullWidth
        >
          <MenuItem value="very_easy">非常簡單</MenuItem>
          <MenuItem value="easy">簡單</MenuItem>
          <MenuItem value="medium">中等</MenuItem>
          <MenuItem value="hard">困難</MenuItem>
          <MenuItem value="very_hard">非常困難</MenuItem>
        </Select>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          displayEmpty
          fullWidth
        >
          <MenuItem value="general">一般</MenuItem>
          <MenuItem value="math">數學</MenuItem>
          <MenuItem value="science">科學</MenuItem>
          <MenuItem value="language">語言</MenuItem>
        </Select>
      </div>
      <Button variant="contained" color="primary" onClick={handleGenerateQuestions}>
        產生題目
      </Button>
      {questions.length > 0 && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setPreviewMode(!previewMode)}
          sx={{ marginTop: 2 }}
        >
          {previewMode ? '隱藏預覽' : '預覽題目'}
        </Button>
      )}
      {previewMode && (
        <div className="questions">
          <ul>
            {questions.map((questionObj, index) => (
              <li key={index} className="question-item">
                <h3>Question {index + 1}: {questionObj.question}</h3>
                <p><strong>Answer:</strong> {questionObj.answer}</p>
                <p><strong>Explanation:</strong> {questionObj.explanation}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="questions">
        {questions.length > 0 && !previewMode && (
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