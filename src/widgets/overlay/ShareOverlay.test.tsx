import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ShareOverlay from './ShareOverlay';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../../utils/client', () => ({
    supabase: {
        from: () => ({
            insert: () => ({
                single: () => ({ error: null })
            })
        })
    }
}));

vi.mock('../../shared/tmodal/TModal', () => ({
    default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

const theme = createTheme();

describe('ShareOverlay component', () => {
    it('renders with default title', () => {
        render(
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <ShareOverlay pageId={1} />
                </ThemeProvider>
            </BrowserRouter>
        );
        expect(screen.getByText('Отправить')).toBeInTheDocument();
    });

    it('renders with custom title', () => {
        render(
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <ShareOverlay pageId={1} title="Custom Title" />
                </ThemeProvider>
            </BrowserRouter>
        );
        expect(screen.getByText('Custom Title')).toBeInTheDocument();
    });

    it('opens dialog and shows sharing options', () => {
        render(
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <ShareOverlay pageId={1} />
                </ThemeProvider>
            </BrowserRouter>
        );
        
        // Нажимаем на кнопку "Отправить"
        const sendButton = screen.getByText('Отправить');
        fireEvent.click(sendButton);

        // Проверяем, что диалог открылся
        expect(screen.getByText('У кого есть ссылка')).toBeInTheDocument();
        
        // Нажимаем на аккордеон для раскрытия радио кнопок
        const accordion = screen.getByRole('button', { name: 'Только чтение' });
        fireEvent.click(accordion);

        // Теперь проверяем радио кнопки
        expect(screen.getByLabelText('Только чтение')).toBeInTheDocument();
        expect(screen.getByLabelText('Редактирование')).toBeInTheDocument();
    });
});