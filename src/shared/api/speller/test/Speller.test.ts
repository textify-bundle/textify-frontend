import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { checkText, checkTexts, formatSpellingErrors, autoCorrectText, handleSpellerError } from '../SpellerWrapper';
import { errors, ERROR_UNKNOWN_WORD, ERROR_REPEATED_WORD, ERROR_CAPITALIZATION, ERROR_TOO_MANY_ERRORS } from '../errors';

describe('checkText()', () => {
    it('should check text for typos', async () => {
        const text = "This is a sample text with a typo.";
        const callback = vi.fn();
        await checkText(text, callback, { lang: 'en' });
        expect(callback).toHaveBeenCalled();
        const [error, result] = callback.mock.calls[0];
        expect(error).toBeNull();
        expect(result).toBeInstanceOf(Array);
    });

    it('should handle errors', async () => {
        const text = "This is a sample text with a typo.";
        const callback = vi.fn();
        await checkText(text, callback, { lang: 'invalid' });
        expect(callback).toHaveBeenCalled();
        const [error, result] = callback.mock.calls[0];
        expect(error).toBeInstanceOf(Error);
        expect(result).toBeNull();
    });
});

describe('checkTexts()', () => {
    it('should check multiple texts for typos', async () => {
        const texts = ["This is a sample text with a typo.", "Another text with a typo."];
        const callback = vi.fn();
        await checkTexts(texts, callback, { lang: 'en' });
        expect(callback).toHaveBeenCalled();
        const [error, result] = callback.mock.calls[0];
        expect(error).toBeNull();
        expect(result).toBeInstanceOf(Array);
    });

    it('should handle errors', async () => {
        const texts = ["This is a sample text with a typo.", "Another text with a typo."];
        const callback = vi.fn();
        await checkTexts(texts, callback, { lang: 'invalid' });
        expect(callback).toHaveBeenCalled();
        const [error, result] = callback.mock.calls[0];
        expect(error).toBeInstanceOf(Error);
        expect(result).toBeNull();
    });
});

describe('formatSpellingErrors()', () => {
    it('should format spelling errors', () => {
        const errors = [
            { code: 1, pos: 5, row: 1, col: 6, len: 7, word: 'mispell', s: ['misspell', 'miscell'] },
            { code: 2, pos: 15, row: 2, col: 3, len: 5, word: 'eror', s: ['error'] }
        ];
        const formattedErrors = formatSpellingErrors(errors);
        expect(formattedErrors).toBeTypeOf('string');
        expect(formattedErrors).toContain('Error at position 5 (row 1, col 6): "mispell" Suggestions: misspell, miscell');
        expect(formattedErrors).toContain('Error at position 15 (row 2, col 3): "eror" Suggestions: error');
    });

    it('should handle no errors', () => {
        const errors: any[] = [];
        const formattedErrors = formatSpellingErrors(errors);
        expect(formattedErrors).toBe('No spelling errors found.');
    });
});

describe('autoCorrectText()', () => {
    it('should auto-correct text based on spelling suggestions', () => {
        const text = "This is a sample text with a typo.";
        const errors = [
            { code: 1, pos: 25, row: 1, col: 26, len: 5, word: 'typo', s: ['error'] }
        ];
        const correctedText = autoCorrectText(text, errors);
        expect(correctedText).toBe('This is a sample text with a error.');
    });

    it('should handle no suggestions', () => {
        const text = "This is a sample text with a typo.";
        const errors = [
            { code: 1, pos: 25, row: 1, col: 26, len: 5, word: 'typo', s: [] }
        ];
        const correctedText = autoCorrectText(text, errors);
        expect(correctedText).toBe(text);
    });
});

describe('handleSpellerError()', () => {
    it('should handle speller errors', () => {
        const error = new Error('Test error');
        const structuredError = handleSpellerError(error);
        expect(structuredError).toBeInstanceOf(Error);
        expect(structuredError.message).toContain('Details: Test error');
    });
});
