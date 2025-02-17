export interface OpenAIConfig {
    apiKey: string;
    model: string;
    temperature: number;
    maxTokens: number;
}

export const DEFAULT_OPENAI_CONFIG: OpenAIConfig = {
    apiKey: '',
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    maxTokens: 2000,
};

export const AVAILABLE_MODELS = [
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
    { value: 'gpt-4', label: 'GPT-4' },
] as const;
