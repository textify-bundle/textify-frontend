import axios from 'axios';

/**
 * Enum representing the types of word errors returned by the Yandex Speller API.
 */
export enum WordErrorType {
  ERROR_UNKNOWN_WORD = 1,
  ERROR_REPEAT_WORD = 2,
  ERROR_CAPITALIZATION = 3,
  ERROR_TOO_MANY_ERRORS = 4
}

/**
 * Type representing a word error returned by the Yandex Speller API.
 *
 * @property {WordErrorType} code - The error code.
 * @property {number} pos - The position of the error in the text.
 * @property {number} len - The length of the error word.
 * @property {string} word - The error word.
 * @property {string[]} s - Array of suggested corrections.
 */
export type WordError = {
  code: WordErrorType;
  pos: number;
  len: number;
  word: string;
  s: string[];
};

/**
 * Type representing the parameters for the checkText function.
 *
 * @property {string} text - The text to be checked.
 * @property {string} [lang='ru,en'] - The languages to check against.
 * @property {number} [options=0] - The options for the speller service.
 * @property {string} [format='plain'] - The format of the text.
 * @property {string} [callback] - The callback function name for JSONP.
 */
export type CheckTextParams = {
  text: string;
  lang?: string;
  options?: number;
  format?: string;
  callback?: string;
};

/**
 * Function to check the text for spelling errors using the Yandex Speller API.
 *
 * @param {CheckTextParams} params - The parameters for the spelling check.
 * @returns {Promise<WordError[]>} A promise that resolves to an array of WordError objects.
 * @throws {Error} Throws an error if the API request fails.
 */
export async function checkText(params: CheckTextParams): Promise<WordError[]> {
  const { text, lang = 'ru,en', options = 0, format = 'plain', callback } = params;

  const url = 'https://speller.yandex.net/services/spellservice.json/checkText';
  const queryParams = new URLSearchParams({
    text,
    lang,
    options: options.toString(),
    format,
    ...(callback ? { callback } : {})
  });

  try {
    const response = await axios.get<WordError[]>(`${url}?${queryParams}`);
    return response.data;
  } catch (error) {
    throw handleSpellerError(error);
  }
}

/**
 * Function to format spelling errors into a user-friendly string.
 *
 * @param {WordError[]} errors - An array of WordError objects.
 * @returns {string} A formatted string representing the spelling errors.
 */
export function formatSpellingErrors(errors: WordError[]): string {
  return errors.map(error => {
    const suggestions = error.s.join(', ');
    return `Code: ${error.code}, Word: "${error.word}" error in symbol at position ${error.pos}. Suggestions: ${suggestions}`;
  }).join('\n');
}

/**
 * Function to automatically correct text based on spelling suggestions.
 *
 * @param {string} text - The original text.
 * @param {WordError[]} errors - An array of WordError objects.
 * @returns {string} The corrected text.
 */
export function autoCorrectText(text: string, errors: WordError[]): string {
  let correctedText = text;

  errors.forEach(error => {
    if (error.s.length > 0) {
      const suggestion = error.s[0];
      correctedText = correctedText.substring(0, error.pos) + suggestion + correctedText.substring(error.pos + error.len);
    }
  });

  return correctedText;
}

/**
 * Function to validate the text for spelling check.
 *
 * @param {string} text - The text to be validated.
 * @returns {boolean} True if the text is valid for spelling check, false otherwise.
 */
export function validateText(text: string): boolean {
  const maxLength = 10000;
  const validCharacters = /^[a-zA-Zа-яА-ЯёЁ0-9\s.,!?()"'-]+$/;

  if (text.length > maxLength) {
    return false;
  }

  if (!validCharacters.test(text)) {
    return false;
  }

  return true;
}

/**
 * Function to handle errors from the speller service.
 *
 * @param {any} error - The error object.
 * @returns {Error} A structured error object.
 */
export function handleSpellerError(error: any): Error {
  console.error('Speller service error:', error);

  const structuredError = new Error('Speller service error');
  structuredError.name = 'SpellerServiceError';
  structuredError.message = error.message || 'An error occurred while checking the text.';
  structuredError.stack = error.stack || '';

  return structuredError;
}
