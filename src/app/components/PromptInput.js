import React, { useState } from 'react';
import { config } from '../config';
import '../styles/PromptInput.scss';

const PromptInput = ({ onInsertText }) => {
    const [prompt, setPrompt] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePromptSubmit = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${config.OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: config.OPENAI_MODEL || 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: prompt }],
                    max_tokens: config.MAX_TOKENS || 1000,
                    temperature: config.TEMPERATURE || 0.7,
                }),
            });

            if (!response.ok) {
                throw new Error('Ошибка при получении ответа от API');
            }

            const data = await response.json();
            const generatedText = data.choices[0].message.content;
            
            onInsertText(generatedText);
            setIsOpen(false);
            setPrompt('');
        } catch (err) {
            setError(err.message);
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
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Введите ваш промпт..."
                            className="prompt-textarea"
                        />
                        
                        {error && (
                            <div className="prompt-error">
                                {error}
                            </div>
                        )}
                        
                        <div className="prompt-actions">
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="prompt-button cancel"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={handlePromptSubmit}
                                className="prompt-button submit"
                                disabled={isLoading || !prompt.trim()}
                            >
                                {isLoading ? 'Генерация...' : 'Сгенерировать'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PromptInput;
