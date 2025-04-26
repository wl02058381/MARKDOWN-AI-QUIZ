module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: ["**/__tests__/**/*.(js|jsx|ts|tsx)", "**/?(*.)+(test|spec).(js|jsx|ts|tsx)"],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // 使用 babel-jest 來處理 ES 模組
    },
    transformIgnorePatterns: [
        "/node_modules/(?!react-markdown|remark-gfm|github-markdown-css)/", // 確保轉譯 ESM 套件
    ],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy", // 模擬 CSS 模組
    },
};