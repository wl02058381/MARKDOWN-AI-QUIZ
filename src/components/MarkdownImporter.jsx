import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // 引入 remark-gfm 插件
import 'github-markdown-css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function MarkdownImporter({ onMarkdownImport }) {
  const [markdownContent, setMarkdownContent] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'text/markdown' || file.name.endsWith('.md'))) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMarkdownContent(e.target.result);
        onMarkdownImport(e.target.result);
      };
      reader.readAsText(file);
    } else {
      alert('請上傳有效的 Markdown 檔案。');
    }
  };

  return (
    <Box className="markdown-importer" sx={{ textAlign: 'center', padding: 2 }}>
      {/* 網站說明 */}
      <Typography variant="body1" gutterBottom>
        上傳您的 Markdown 檔案，我們將自動為您生成測驗題目！
      </Typography>

      {/* 檔案選擇區域 */}
      <Typography variant="h6" gutterBottom>
        選擇您的 Markdown 檔案
      </Typography>
      <Button
        variant="contained"
        component="label"
        color="primary"
        sx={{ marginBottom: 2 }}
      >
        上傳檔案
        <input
          type="file"
          accept=".md"
          onChange={handleFileChange}
          hidden
        />
      </Button>

      {/* Markdown 預覽 */}
      {markdownContent && (
        <Box
          className="markdown-preview-container"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 2,
          }}
        >
          <Box
            className="markdown-preview markdown-body"
            sx={{
              maxWidth: '80%',
              textAlign: 'left',
            }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownContent}</ReactMarkdown>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default MarkdownImporter;