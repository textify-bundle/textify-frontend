import { OpenAIConfig } from '../config/openai';

interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

interface OpenAIResponse {
    choices: Array<{
        message: {
            content: string;
        };
    }>;
}

interface OpenAIError {
    error: {
        message: string;
        type?: string;
        code?: string;
    };
}

class OpenAIService {
    private config: OpenAIConfig;

    constructor(config: OpenAIConfig) {
        this.config = config;
    }

    async generateText(prompt: string): Promise<string> {
        if (!this.config.apiKey) {
            throw new Error('API ключ OpenAI не настроен');
        }

        try {
            const messages: ChatMessage[] = [
                {
                    role: 'system',
                    content: 'Вы - помощник, который генерирует текст на основе запроса пользователя.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ];

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.config.apiKey}`,
                },
                body: JSON.stringify({
                    model: this.config.model,
                    messages,
                    temperature: this.config.temperature,
                    max_tokens: this.config.maxTokens,
                }),
            });

            if (!response.ok) {
                const error = await response.json() as OpenAIError;
                console.error('OpenAI API error:', error);

                if (error.error.code === 'insufficient_quota' || response.status === 429) {
                    throw new Error('Превышен лимит запросов к API. Пожалуйста, проверьте баланс вашего аккаунта OpenAI или попробуйте позже.');
                }

                throw new Error(error.error.message || 'Ошибка при генерации текста');
            }

            const data: OpenAIResponse = await response.json();
            return data.choices[0].message.content.trim();
        } catch (error) {
            console.error('Error in OpenAI service:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Произошла неизвестная ошибка при генерации текста');
        }
    }
}

export default OpenAIService;
