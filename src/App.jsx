import { useState } from 'react';
import MarkdownImporter from './components/MarkdownImporter';
import QuizGenerator from './components/QuizGenerator';
import QuestionList from './components/QuestionList';
import AnswerChecker from './components/AnswerChecker';
import './App.css';

function App() {
  const [markdownContent, setMarkdownContent] = useState('');
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');
  const [questionCount, setQuestionCount] = useState(5);

  const handleMarkdownImport = (content) => {
    console.log('Debug: Imported Markdown content:', content);
    setMarkdownContent(content);
  };

  const handleGenerateQuestions = (generatedQuestions) => {
    setQuestions(generatedQuestions);
  };

  const handleAnswerCheck = (answers) => {
    setUserAnswers(answers);
  };

  return (
    <div className="App">
      <h1>Markdown AI Quiz App</h1>
      <MarkdownImporter onMarkdownImport={handleMarkdownImport} />
      <QuizGenerator 
        markdownContent={markdownContent} 
        onGenerateQuestions={handleGenerateQuestions} 
        difficulty={difficulty} 
        questionCount={questionCount} 
      />
      <QuestionList questions={questions} />
      <AnswerChecker questions={questions} userAnswers={userAnswers} onCheckAnswers={handleAnswerCheck} />
    </div>
  );
}

export default App;