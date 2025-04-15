import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css'; // 引入 GitHub 樣式
// import './MarkdownImporter.css'; // 引入自定義樣式

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
      alert('Please upload a valid Markdown file.');
    }
  };

  return (
    <div className="markdown-importer">
      <input type="file" accept=".md" onChange={handleFileChange} />
      {markdownContent && (
        <div className="markdown-preview markdown-body">
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default MarkdownImporter;