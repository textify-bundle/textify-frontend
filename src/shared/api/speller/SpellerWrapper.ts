import postRetryingDecorator from './post';
import {
    errors,
    ERROR_UNKNOWN_WORD,
    ERROR_REPEATED_WORD,
    ERROR_CAPITALIZATION,
    ERROR_TOO_MANY_ERRORS,
} from './errors';

const YASPELLER_HOST = 'speller.yandex.net';
const YASPELLER_PATH = '/services/spellservice.json/';

const DEFAULT_FORMAT = 'plain';
const DEFAULT_LANG = 'en,ru';
const DEFAULT_REQUEST_LIMIT = 2;
const DEFAULT_TIMEOUT = 500;

interface Settings {
    format?: string;
    lang?: string | string[];
    requestLimit?: number;
    timeout?: number;
    options?: {
        ignoreDigits?: boolean;
        ignoreUrls?: boolean;
        findRepeatWords?: boolean;
        ignoreCapitalization?: boolean;
    };
}

interface Callback {
    (error: Error | null, result?: any): void;
}

interface SpellingError {
    code: number;
    pos: number;
    row: number;
    col: number;
    len: number;
    word: string;
    s: string[];
}

/**
 * Check text for typos.
 *
 * @param {string} text
 * @param {Callback} callback
 * @param {Settings} settings
 * @see {@link https://tech.yandex.ru/speller/doc/dg/reference/checkText-docpage/}
 */
function checkText(text: string, callback: Callback, settings?: Settings): void {
    const form = prepareSettings(settings);
    form.text = text;

    postRetryingDecorator({
        url: `https://${YASPELLER_HOST}${YASPELLER_PATH}checkText`,
        form: form,
        requestLimit: settings?.requestLimit || DEFAULT_REQUEST_LIMIT,
        timeout: settings?.timeout || DEFAULT_TIMEOUT,
    }, function(error, response, body) {
        if (error) {
            callback(error, null);
        } else {
            if (response?.status === 200) {
                callback(null, body);
            } else {
                callback(
                    new Error('Yandex.Speller API returns status code is ' + response?.status),
                    null
                );
            }
        }
    });
}

/**
 * Check text for typos.
 *
 * @param {string[]} texts
 * @param {Callback} callback
 * @param {Settings} settings
 * @see {@link https://tech.yandex.ru/speller/doc/dg/reference/checkTexts-docpage/}
 */
function checkTexts(texts: string[], callback: Callback, settings?: Settings): void {
    const form = prepareSettings(settings);
    form.text = texts;

    postRetryingDecorator({
        url: `https://${YASPELLER_HOST}${YASPELLER_PATH}checkTexts`,
        form: form,
        requestLimit: settings?.requestLimit || DEFAULT_REQUEST_LIMIT,
        timeout: settings?.timeout || DEFAULT_TIMEOUT,
    }, function(error, response, body) {
        if (error) {
            callback(error, null);
        } else {
            if (response?.status === 200) {
                callback(null, body);
            } else {
                callback(
                    new Error('Yandex.Speller API returns status code is ' + response?.status),
                    null
                );
            }
        }
    });
}

/**
 * Prepare options for the Yandex.Speller API request.
 *
 * @param {Object} options - An object containing boolean options for the request.
 * @param {boolean} [options.ignoreDigits] - Ignore words with numbers, such as "avp17h4534".
 * @param {boolean} [options.ignoreUrls] - Ignore Internet addresses, email addresses, and filenames.
 * @param {boolean} [options.findRepeatWords] - Highlight repetitions of words, consecutive. For example, "I flew to to to Cyprus".
 * @param {boolean} [options.ignoreCapitalization] - Ignore the incorrect use of UPPERCASE / lowercase letters, for example, in the word "moscow".
 * @returns {number} - A number representing the combined options.
 * @see {@link https://yandex.ru/dev/speller/doc/ru/reference/speller-options}
 */
function prepareOptions(options?: { [key: string]: boolean }): number {
    let result = 0;
    const standartOptions: { [key: string]: number } = {
        IGNORE_DIGITS: 2,
        IGNORE_URLS: 4,
        FIND_REPEAT_WORDS: 8,
        IGNORE_CAPITALIZATION: 512,
    };

    if (options) {
        Object.keys(options).forEach(function(key) {
            const upperCaseKey = key.replace(/([A-Z])/g, '_$1').toUpperCase();
            if (standartOptions[upperCaseKey] && options[key]) {
                result |= standartOptions[upperCaseKey];
            }
        });
    }

    return result;
}

/**
 * Prepare settings for the Yandex.Speller API request.
 *
 * @param {Settings} [settings] - An object containing settings for the request.
 * @param {string} [settings.format] - Text format: plain or html.
 * @param {string|Array} [settings.lang] - Language: en, ru or uk.
 * @param {number} [settings.requestLimit] - Request repeat count in case of internet connection issues.
 * @param {number} [settings.timeout] - Timeout between request repeats in milliseconds.
 * @param {Object} [settings.options] - Options for the request.
 * @param {boolean} [settings.options.ignoreDigits] - Ignore words with numbers, such as "avp17h4534".
 * @param {boolean} [settings.options.ignoreUrls] - Ignore Internet addresses, email addresses, and filenames.
 * @param {boolean} [settings.options.findRepeatWords] - Highlight repetitions of words, consecutive. For example, "I flew to to to Cyprus".
 * @param {boolean} [settings.options.ignoreCapitalization] - Ignore the incorrect use of UPPERCASE / lowercase letters, for example, in the word "moscow".
 * @returns {Object} - An object containing the prepared settings for the request.
 */
function prepareSettings(settings?: Settings): { [key: string]: any } {
    settings = settings || {};

    return {
        format: settings.format || DEFAULT_FORMAT,
        lang: settings.lang || DEFAULT_LANG,
        options: prepareOptions(settings.options),
        requestLimit: settings.requestLimit || DEFAULT_REQUEST_LIMIT,
        timeout: settings.timeout || DEFAULT_TIMEOUT,
    };
}

/**
 * Formats the list of spelling errors into a user-friendly format.
 *
 * @param {SpellingError[]} errors - The list of spelling errors.
 * @returns {string} - A user-friendly string representation of the spelling errors.
 */
function formatSpellingErrors(errors: SpellingError[]): string {
    if (errors.length === 0) {
        return 'No spelling errors found.';
    }

    return errors.map(error => {
        const suggestions = error.s.length > 0 ? ` Suggestions: ${error.s.join(', ')}` : '';
        return `Error at position ${error.pos} (row ${error.row}, col ${error.col}): "${error.word}"${suggestions}`;
    }).join('\n');
}

/**
 * Auto-correct text based on spelling suggestions.
 *
 * @param {string} text - The original text with potential spelling errors.
 * @param {SpellingError[]} errors - The list of spelling errors with suggestions.
 * @returns {string} - The corrected text with spelling errors replaced by suggestions.
 */
function autoCorrectText(text: string, errors: SpellingError[]): string {
    let correctedText = text;

    errors.forEach(error => {
        if (error.s.length > 0) {
            const suggestion = error.s[0]; // Use the first suggestion
            correctedText = correctedText.substring(0, error.pos) + suggestion + correctedText.substring(error.pos + error.len);
        }
    });

    return correctedText;
}

const supportedFormats = ['plain', 'html'];

export {
    checkText,
    checkTexts,
    DEFAULT_FORMAT as defaultFormat,
    DEFAULT_LANG as defaultLang,
    errors,
    ERROR_UNKNOWN_WORD,
    ERROR_REPEATED_WORD,
    ERROR_CAPITALIZATION,
    ERROR_TOO_MANY_ERRORS,
    supportedFormats,
    formatSpellingErrors,
    autoCorrectText
};
