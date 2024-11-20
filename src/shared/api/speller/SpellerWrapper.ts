import axios from 'axios';

export type SpellCheckResponse = {
  code: number;
  pos: number;
  row: number;
  col: number;
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

export async function checkText(params: CheckTextParams): Promise<SpellCheckResponse[]> {
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
    const response = await axios.get<SpellCheckResponse[]>(`${url}?${queryParams}`);
    return response.data;
  } catch (error) {
    throw handleSpellerError(error);
  }
}

export function formatSpellingErrors(errors: SpellCheckResponse[]): string {
  return errors.map(error => {
    const suggestions = error.s.join(', ');
    return `Word: "${error.word}" at position ${error.pos} (row ${error.row}, col ${error.col}). Suggestions: ${suggestions}`;
  }).join('\n');
}

export function autoCorrectText(text: string, errors: SpellCheckResponse[]): string {
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
    console.error('Text is too long for spelling check.');
    return false;
  }

  if (!validCharacters.test(text)) {
    console.error('Text contains invalid characters.');
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
