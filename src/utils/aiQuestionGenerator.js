import axios from 'axios';

const LOCAL_PROXY_URL = 'http://localhost:5000/api/generate-questions';

export const generateQuestions = async (markdownContent, questionCount, difficulty, category) => {
  console.log('Debug: markdownContent:', markdownContent);
  console.log('Debug: questionCount:', questionCount);
  console.log('Debug: difficulty:', difficulty);
  console.log('Debug: category:', category);

  return axios.post(LOCAL_PROXY_URL, {
    content: markdownContent,
    questionCount: questionCount,
    difficulty: difficulty,
    category: category,
  }).then((response) => {
    console.log('Debug: Raw response:', response.data.questions);

    // 直接返回後端的 questions 數據
    const parsedQuestions = response.data.questions;
    console.log('Debug: Parsed questions:', parsedQuestions);
    return parsedQuestions;
  }).catch((error) => {
    console.error('Error fetching questions:', error);
    throw new Error('Failed to fetch questions from the server.');
  });
};