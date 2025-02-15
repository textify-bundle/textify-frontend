import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import TModal from '../../shared/tmodal/TModal';
import { OpenAIService } from '../../shared/lib/openai/openai.service';
import styles from './AIPromptModal.module.css';

interface AIPromptModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (text: string) => void;
}

export const AIPromptModal: React.FC<AIPromptModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const config = useSelector((state: RootState) => state.openAISettings);

    const handlePromptSubmit = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const generatedText = await OpenAIService.generateText(prompt, config);
            
            onSubmit(generatedText);
            onClose();
            setPrompt('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Произошла ошибка');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <TModal isOpen={isOpen} onClose={onClose} title="AI Prompt">
            <div className={styles.modalContent}>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Введите ваш запрос..."
                    className={styles.promptInput}
                />
                {error && <div className={styles.error}>{error}</div>}
                <div className={styles.buttonContainer}>
                    <button
                        onClick={handlePromptSubmit}
                        disabled={isLoading || !prompt.trim()}
                        className={styles.submitButton}
                    >
                        {isLoading ? 'Генерация...' : 'Сгенерировать'}
                    </button>
                </div>
            </div>
        </TModal>
    );
};
