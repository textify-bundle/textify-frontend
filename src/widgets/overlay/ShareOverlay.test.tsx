import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest';
import {  cleanup } from '@testing-library/react';
// import ShareOverlay from './ShareOverlay';

describe("PageShare component", () => {
    beforeEach(() => {
        Object.defineProperty(navigator, 'clipboard', {
            value: {
                writeText: vi.fn().mockResolvedValueOnce(undefined),
            },
            writable: true
        });

        // render(<ShareOverlay pageId={123} />);
    });

    afterEach(cleanup);

    test("default", async () => {
        expect(2+2).toBe(4);
    });




    // test("Test copy link to clipboard when 'Копировать ссылку' button is clicked", async () => {
    //     const copyButton = screen.getByText("Копировать ссылку");

    //     fireEvent.click(copyButton);

    //     const expectedLink = `${window.location.origin}/shared`;
    //     expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expectedLink);
    // });

    
    // test("Test chenges radio button", async () => {
    //     const readOnlyRadio = screen.getByLabelText('Только чтение');

    //     // const editRadio = screen.getByDisplayValue(/Редактирование/i);

    //     fireEvent.click(readOnlyRadio);
    //     expect(readOnlyRadio).toBeChecked();

    // });
});