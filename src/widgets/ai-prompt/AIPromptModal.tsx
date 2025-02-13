import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import OpenAIService from '../../shared/api/openai';
import styles from './AIPromptModal.module.css';

interface AIPromptModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (text: string) => void;
}

export const AIPromptModal: React.FC<AIPromptModalProps> = ({
    isOpen,
    onClose,
    onSubmit
}) => {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [generatedText, setGeneratedText] = useState<string | null>(null);
    const navigate = useNavigate();
    const openaiConfig = useSelector((state: RootState) => state.settings.openai);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setIsLoading(true);
        setError(null);
        setGeneratedText(null);

        try {
            if (!openaiConfig.apiKey) {
                throw new Error('API ключ не настроен. Пожалуйста, настройте API ключ в настройках.');
            }

            const openai = new OpenAIService(openaiConfig);
            const text = await openai.generateText(prompt);
            setGeneratedText(text);
        } catch (err) {
            console.error('Error generating text:', err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Произошла неизвестная ошибка');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleInsert = () => {
        if (generatedText) {
            onSubmit(generatedText);
            onClose();
        }
    };

    const handleGoToSettings = () => {
        onClose();
        navigate('/main/settings/ai');
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <h2>Генерация текста с помощью AI</h2>
                
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Опишите, какой текст вы хотите сгенерировать..."
                        className={styles.textarea}
                        disabled={isLoading}
                    />

                    {error && (
                        <div className={styles.error}>
                            <p>{error}</p>
                            {!openaiConfig.apiKey && (
                                <button 
                                    type="button" 
                                    onClick={handleGoToSettings}
                                    className={styles.settingsButton}
                                >
                                    Перейти к настройкам
                                </button>
                            )}
                        </div>
                    )}

                    {generatedText && (
                        <div className={styles.generatedText}>
                            <h3>Сгенерированный текст:</h3>
                            <div className={styles.textContent}>
                                {generatedText}
                            </div>
                            <button 
                                type="button" 
                                onClick={handleInsert}
                                className={styles.insertButton}
                            >
                                Вставить текст
                            </button>
                        </div>
                    )}

                    <div className={styles.buttons}>
                        <button 
                            type="button" 
                            onClick={onClose}
                            className={styles.cancelButton}
                            disabled={isLoading}
                        >
                            Отмена
                        </button>
                        <button 
                            type="submit"
                            className={styles.generateButton}
                            disabled={!prompt.trim() || isLoading}
                        >
                            {isLoading ? 'Генерация...' : 'Сгенерировать'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
