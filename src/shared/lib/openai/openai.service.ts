import { OpenAIConfig } from '../../config/openai';

export class OpenAIService {
    static async generateText(prompt: string, config: OpenAIConfig): Promise<string> {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${config.apiKey}`,
                },
                body: JSON.stringify({
                    model: config.model,
                    messages: [{ role: 'user', content: prompt }],
                    max_tokens: config.maxTokens,
                    temperature: config.temperature,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'Ошибка при получении ответа от API');
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Неизвестная ошибка при обращении к OpenAI API');
        }
    }
}
