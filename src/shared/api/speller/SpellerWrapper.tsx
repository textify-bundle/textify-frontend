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

function prepareOptions(options?: { [key: string]: boolean }): number {
    let result = 0;
    // https://yandex.ru/dev/speller/doc/ru/reference/speller-options
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

function formatSpellingErrors(errors: SpellingError[]): string {
    if (errors.length === 0) {
        return 'No spelling errors found.';
    }

    return errors.map(error => {
        const suggestions = error.s.length > 0 ? ` Suggestions: ${error.s.join(', ')}` : '';
        return `Error at position ${error.pos} (row ${error.row}, col ${error.col}): "${error.word}"${suggestions}`;
    }).join('\n');
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
    formatSpellingErrors
};
