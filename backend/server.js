const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 初始化 DeepSeek API 客戶端
const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1/', // DeepSeek API 的基礎 URL
    apiKey: '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', // 替換為您的 DeepSeek API 金鑰
});

app.post('/api/generate-questions', async (req, res) => {
    console.log("Received request to generate questions:", req.body);
    try {
        const { content, questionCount, difficulty } = req.body;

        // 使用 DeepSeek SDK 發送請求
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: `您是一個有幫助的助手，會根據以下的 Markdown 內容生成 ${questionCount} 道 ${difficulty} 難度的測驗題目。請務必以以下格式回傳，並且不得包含多餘的字符或修飾（如 \\boxed 等）：\n\n\`\`\`json\n[\n  {\n    \"question\": \"問題內容\",\n    \"answer\": \"正確答案\",\n    \"choices\": [\"選項1\", \"選項2\", \"選項3\", \"選項4\"],\n    \"explanation\": \"答案解釋\"\n  }\n]\n\`\`\`\n\n如果無法生成符合格式的內容，請回傳以下錯誤訊息：\n\n\"error\": \"無法生成符合格式的內容。\"\n\n以下是 Markdown 內容：\n\n${content}`,
                },
            ],
            model: 'deepseek/deepseek-r1-zero:free', // 使用 DeepSeek 提供的模型名稱
        });

        // 檢查 API 回應是否有效
        if (!completion || !completion.choices || !completion.choices[0]) {
            console.error('Invalid API response:', completion);
            return res.status(500).json({ error: 'Invalid API response from DeepSeek.' });
        }

        // 假設回應中包含問題列表
        const rawResponse = completion.choices[0].message.content;
        console.log('Raw AI Response:', rawResponse);

        // 清理多餘字符並提取 JSON 區塊
        const cleanedResponse = rawResponse
            .replace(/\\boxed/g, '') // 移除 \boxed
            .replace(/\\boxed\{/g, '') // 移除 \boxed{
            .replace(/}/g, '') // 移除結尾的 }
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .replace(/\n/g, '')
            .replace(/\s+/g, ' ')
            .trim();

        try {
            const questionsArray = JSON.parse(cleanedResponse);

            // 確保每個問題符合前端需求的格式
            const formattedQuestions = questionsArray.map((questionObj) => ({
                question: questionObj.question,
                answer: questionObj.answer,
                choices: questionObj.choices,
                explanation: questionObj.explanation,
            }));

            res.json({ questions: formattedQuestions });
        } catch (error) {
            console.error('Error parsing cleaned AI response:', error);
            res.status(500).json({ error: 'Failed to parse AI response.' });
        }
    } catch (error) {
        console.error('Error communicating with DeepSeek API:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from DeepSeek API' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});