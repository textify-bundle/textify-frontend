import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { updateOpenAISettings } from '../../store/slices/openAISettingsSlice';
import { AVAILABLE_MODELS } from '../../shared/config/openai';
import styles from './OpenAISettings.module.css';

export const OpenAISettings: React.FC = () => {
    const dispatch = useDispatch();
    const settings = useSelector((state: RootState) => state.openAISettings.openai);

    const handleChange = (field: string, value: string | number) => {
        dispatch(updateOpenAISettings({ [field]: value }));
    };

    return (
        <div className={styles.container}>
            <div className={styles.field}>
                <label htmlFor="apiKey">API Ключ</label>
                <input
                    type="password"
                    id="apiKey"
                    value={settings.apiKey}
                    onChange={(e) => handleChange('apiKey', e.target.value)}
                    placeholder="Введите ваш API ключ OpenAI"
                    className={styles.input}
                />
                <div className={styles.hint}>
                    Получить API ключ можно на сайте{' '}
                    <a 
                        href="https://platform.openai.com/api-keys" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        OpenAI
                    </a>
                </div>
            </div>

            <div className={styles.field}>
                <label htmlFor="model">Модель</label>
                <select
                    id="model"
                    value={settings.model}
                    onChange={(e) => handleChange('model', e.target.value)}
                    className={styles.select}
                >
                    {AVAILABLE_MODELS.map((model) => (
                        <option key={model.value} value={model.value}>
                            {model.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.field}>
                <label htmlFor="temperature">Temperature</label>
                <input
                    type="range"
                    id="temperature"
                    min="0"
                    max="2"
                    step="0.1"
                    value={settings.temperature}
                    onChange={(e) => handleChange('temperature', parseFloat(e.target.value))}
                    className={styles.range}
                />
                <span className={styles.value}>{settings.temperature}</span>
            </div>

            <div className={styles.field}>
                <label htmlFor="maxTokens">Max Tokens</label>
                <input
                    type="number"
                    id="maxTokens"
                    min="1"
                    max="4000"
                    value={settings.maxTokens}
                    onChange={(e) => handleChange('maxTokens', parseInt(e.target.value))}
                    className={styles.input}
                />
            </div>
        </div>
    );
};
