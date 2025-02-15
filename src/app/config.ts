export const config = {
    // OpenAI API настройки
    OPENAI_API_KEY: process.env.REACT_APP_OPENAI_API_KEY || '',
    OPENAI_MODEL: 'gpt-3.5-turbo',
    MAX_TOKENS: 1000,
    TEMPERATURE: 0.7,
    
    // Другие настройки приложения...
};
