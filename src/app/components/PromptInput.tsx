import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { OpenAIService } from '../../shared/lib/openai/openai.service';
import styles from './PromptInput.module.css';

interface PromptInputProps {
    onInsertText: (text: string) => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({ onInsertText }) => {
    const [prompt, setPrompt] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const config = useSelector((state: RootState) => state.openAISettings.openai);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        try {
            setIsLoading(true);
            setError(null);

            const generatedText = await OpenAIService.generateText(prompt, config);
            
            onInsertText(generatedText);
            setIsOpen(false);
            setPrompt('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Произошла ошибка');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="prompt-input-container">
            <button 
                className="prompt-toggle-button"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="prompt-icon">💡</span>
            </button>

            {isOpen && (
                <div className="prompt-modal">
                    <div className="prompt-modal-content">
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <input
                                type="text"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Введите запрос для AI..."
                                className={styles.input}
                                disabled={isLoading}
                            />
                            {error && <div className={styles.error}>{error}</div>}
                            <div className="prompt-actions">
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="prompt-button cancel"
                                >
                                    Отмена
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading || !prompt.trim()}
                                    className={styles.button}
                                >
                                    {isLoading ? 'Генерация...' : 'Сгенерировать'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PromptInput;
