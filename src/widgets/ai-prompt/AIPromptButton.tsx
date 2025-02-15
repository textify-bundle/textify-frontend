import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { AIPromptModal } from './AIPromptModal';
import styles from './AIPromptButton.module.css';

interface AIPromptButtonProps {
    onGenerateText?: (text: string) => void;
}

export const AIPromptButton: React.FC<AIPromptButtonProps> = ({
    onGenerateText
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openaiConfig = useSelector((state: RootState) => state.openAISettings.openai);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (text: string) => {
        if (onGenerateText) {
            onGenerateText(text);
        }
    };

    return (
        <>
            <button 
                className={styles.button} 
                onClick={handleOpenModal}
                title={openaiConfig.apiKey ? 'Генерировать текст с помощью AI' : 'Настройте API ключ в настройках'}
            >
                AI
            </button>
            <AIPromptModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
            />
        </>
    );
};
