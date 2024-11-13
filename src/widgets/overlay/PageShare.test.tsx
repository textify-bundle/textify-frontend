import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import PageShare from './PageShare';

describe("PageShare component", () => {
    beforeEach(() => {
        Object.defineProperty(navigator, 'clipboard', {
            value: {
                writeText: vi.fn().mockResolvedValueOnce(undefined),
            },
            writable: true
        });

        render(<PageShare />);
    });

    afterEach(cleanup);

    test("Test opening display after click", async () => {
        const accordionButton = screen.getByTestId("accordion-header");
        fireEvent.click(accordionButton);
        expect(await screen.findByDisplayValue(/Нет доступа/i)).toBeInTheDocument();
        expect(await screen.findByDisplayValue(/Только чтение/i)).toBeInTheDocument();
        expect(await screen.findByDisplayValue(/Редактирование/i)).toBeInTheDocument();
    });




    test("Test copy link to clipboard when 'Копировать ссылку' button is clicked", async () => {
        const copyButton = screen.getByText("Копировать ссылку");

        fireEvent.click(copyButton);

        const expectedLink = `${window.location.origin}/shared`;
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expectedLink);
    });

    test("Test chenges radio button", async () => {
        const readOnlyRadio = screen.getByLabelText('Только чтение');

        const editRadio = screen.getByDisplayValue(/Редактирование/i);

        fireEvent.click(readOnlyRadio);
        expect(readOnlyRadio).toBeChecked();

    });
});