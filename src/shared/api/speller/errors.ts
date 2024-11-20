/**
 *  @see {@link https://tech.yandex.ru/speller/doc/dg/reference/error-codes-docpage/}
 */

export const ERROR_UNKNOWN_WORD = 1;
export const ERROR_REPEATED_WORD = 2;
export const ERROR_CAPITALIZATION = 3;
export const ERROR_TOO_MANY_ERRORS = 4;

export const errors = [
    {
        code: ERROR_UNKNOWN_WORD,
        name: 'ERROR_UNKNOWN_WORD',
        text: 'Typos',
    },
    {
        code: ERROR_REPEATED_WORD,
        name: 'ERROR_REPEATED_WORD',
        text: 'Repeated words',
    },
    {
        code: ERROR_CAPITALIZATION,
        name: 'ERROR_CAPITALIZATION',
        text: 'Capitalization',
    },
    {
        code: ERROR_TOO_MANY_ERRORS,
        name: 'ERROR_TOO_MANY_ERRORS',
        text: 'Too many errors',
    }
];
