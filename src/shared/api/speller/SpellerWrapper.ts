import axios from 'axios';

export enum WordErrorType {
    ERROR_UNKNOWN_WORD = 1,
    ERROR_REPEAT_WORD = 2,
    ERROR_CAPITALIZATION = 3,
    ERROR_TOO_MANY_ERRORS = 4
  }

export type WordError = {
    code: WordErrorType;
    pos: number;
    len: number;
    word: string;
    s: string[];
};

export type CheckTextParams = {
  text: string; 
  lang?: string; 
  options?: number; 
  format?: string; 
  callback?: string; 
};

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

export function formatSpellingErrors(errors: WordError[]): string {
  return errors.map(error => {
    const suggestions = error.s.join(', ');
    return `Code: ${error.code}, Word: "${error.word}" error in symbol at position ${error.pos}. Suggestions: ${suggestions}`;
  }).join('\n');
}

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

  export function handleSpellerError(error: any): Error {
    console.error('Speller service error:', error);
  
    const structuredError = new Error('Speller service error');
    structuredError.name = 'SpellerServiceError';
    structuredError.message = error.message || 'An error occurred while checking the text.';
    structuredError.stack = error.stack || '';
  
    return structuredError;
  }
