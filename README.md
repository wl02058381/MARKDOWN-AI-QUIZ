# Markdown AI 測驗應用程式

## 概述
Markdown AI 測驗應用程式是一個基於 React 的應用程式，允許使用者匯入 Markdown 檔案，透過 AI 生成測驗題目，並檢視答案與解釋。此應用程式提供直觀的使用者介面，讓使用者可以選擇題目數量與難度，並進行互動式測驗。

## 功能特色
- **Markdown 檔案匯入**：支援匯入 `.md` 格式的 Markdown 檔案，並解析其內容。
- **AI 生成測驗題目**：根據匯入的 Markdown 檔案內容，透過 AI 自動生成測驗題目。
- **題目數量與難度選擇**：使用者可自訂生成的題目數量與難度（簡單、中等、困難）。
- **互動式測驗**：提供 Google 表單風格的選項介面，使用者可選擇答案並點擊確認按鈕查看正確答案與解釋。
- **即時反饋**：在回答後即時顯示正確答案與詳細解釋，幫助使用者學習。

## 專案結構
```
markdown-ai-quiz-app
├── public
│   └── index.html          # 主 HTML 檔案
├── src
│   ├── components
│   │   ├── MarkdownImporter.jsx  # Markdown 檔案匯入元件
│   │   ├── QuizGenerator.jsx      # 測驗題目生成元件
│   │   ├── QuestionList.jsx       # 顯示測驗題目元件
│   │   └── AnswerChecker.jsx      # 檢查答案元件
│   ├── utils
│   │   ├── markdownParser.js      # Markdown 解析工具
│   │   └── aiQuestionGenerator.js  # AI 測驗題目生成工具
│   ├── App.jsx                   # 主應用程式元件
│   ├── App.css                   # 應用程式樣式
│   └── index.jsx                 # 應用程式進入點
├── package.json                  # NPM 設定檔案
├── README.md                     # 專案說明文件
└── .gitignore                    # Git 忽略設定檔案
```

## 安裝步驟
1. **複製專案**：
   使用以下指令將專案複製到本地端：
   ```bash
   git clone <repository-url>
   ```

2. **進入專案目錄**：
   ```bash
   cd markdown-ai-quiz-app
   ```

3. **安裝相依套件**：
   使用以下指令安裝所需的相依套件：
   ```bash
   npm install
   ```

## 使用方式
1. **啟動開發伺服器**：
   使用以下指令啟動應用程式：
   ```bash
   npm run dev
   ```

2. **開啟瀏覽器**：
   在瀏覽器中開啟 `http://localhost:5173`。

3. **匯入 Markdown 檔案**：
   使用應用程式中的匯入功能上傳 `.md` 格式的 Markdown 檔案。

4. **選擇題目數量與難度**：
   在介面中選擇要生成的題目數量與難度。

5. **回答問題**：
   使用 Google 表單風格的選項介面回答問題，並點擊確認按鈕檢視答案與解釋。

## 開發與貢獻
歡迎對此專案進行貢獻！如果有任何建議或問題，請提交 Issue 或 Pull Request。

## 授權
此專案採用 MIT 授權條款，詳情請參閱 [LICENSE](./LICENSE) 文件。