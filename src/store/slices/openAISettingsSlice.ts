import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OpenAIConfig, DEFAULT_OPENAI_CONFIG } from '../../shared/config/openai';

interface SettingsState {
    openai: OpenAIConfig;
}

const initialState: SettingsState = {
    openai: DEFAULT_OPENAI_CONFIG,
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        updateOpenAISettings(state, action: PayloadAction<Partial<OpenAIConfig>>) {
            state.openai = {
                ...state.openai,
                ...action.payload,
            };
        },
    },
});

export const { updateOpenAISettings } = settingsSlice.actions;
export default settingsSlice.reducer;
