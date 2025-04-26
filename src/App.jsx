import React from 'react';
import { useState } from 'react';
import MarkdownImporter from './components/MarkdownImporter';
import QuizGenerator from './components/QuizGenerator';
import QuestionList from './components/QuestionList';
import AnswerChecker from './components/AnswerChecker';
import './App.css';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { saveAs } from 'file-saver';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

function App() {
  const [markdownContent, setMarkdownContent] = useState('');
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');
  const [questionCount, setQuestionCount] = useState(5);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const handleMarkdownImport = (content) => {
    console.log('Debug: Imported Markdown content:', content);
    setMarkdownContent(content);
  };

  const handleGenerateQuestions = async (generatedQuestions) => {
    setLoading(true);
    try {
      // 模擬生成題目過程
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setQuestions(generatedQuestions);
    } catch (error) {
      console.error('Error generating questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerCheck = (answers) => {
    setUserAnswers(answers);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDownloadQuestions = () => {
    const blob = new Blob([JSON.stringify(questions, null, 2)], { type: 'application/json' });
    saveAs(blob, 'questions.json');
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <div className="App">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
            <h1>Markdown AI 測驗產生器</h1>
            <FormControlLabel
              control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
              label={darkMode ? '深色模式' : '淺色模式'}
            />
          </Box>
          <MarkdownImporter onMarkdownImport={handleMarkdownImport} />
          <QuizGenerator 
            markdownContent={markdownContent} 
            onGenerateQuestions={handleGenerateQuestions} 
            difficulty={difficulty} 
            questionCount={questionCount} 
          />
          <QuestionList questions={questions} />
          <AnswerChecker questions={questions} userAnswers={userAnswers} onCheckAnswers={handleAnswerCheck} />

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: 2 }}>
              <CircularProgress />
            </Box>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleDownloadQuestions}
            disabled={questions.length === 0}
            sx={{ marginTop: 2 }}
          >
            下載題目
          </Button>

          {/* Snackbar for notifications */}
          <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity="error">
              請上傳有效的 Markdown 檔案！
            </Alert>
          </Snackbar>

          {/* Footer 區域 */}
          <Box
            component="footer"
            sx={{
              backgroundColor: '#f5f5f5',
              textAlign: 'center',
              padding: 2,
              color: '#000000',
            }}
          >
            <Typography variant="body2">
              © 2025 Markdown AI 測驗產生器. 保留所有權利.
            </Typography>
            <Typography variant="body2">
              開發者：wl02058381
            </Typography>
          </Box>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;