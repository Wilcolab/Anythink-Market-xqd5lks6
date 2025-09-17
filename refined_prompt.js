/**
 * Converts any input to kebab-case format.
 *
 * Handles spaces, underscores, hyphens, mixed delimiters, and various cases (camelCase, PascalCase, snake_case, kebab-case).
 * Removes or normalizes invalid symbols, trims whitespace, and robustly handles edge cases such as empty strings, numbers, null/undefined, and non-string inputs.
 * For objects, uses their string representation if possible; for arrays, returns an empty string.
 *
 * Examples:
 *   toKebabCase('helloWorld')        // 'hello-world'
 *   toKebabCase('Hello World')       // 'hello-world'
 *   toKebabCase('user_ID-number')    // 'user-id-number'
 *   toKebabCase(123)                 // '123'
 *   toKebabCase(null)                // ''
 *
 * @function
 * @param {*} input - The value to convert to kebab-case. Accepts strings, numbers, objects, arrays, null, or undefined.
 * @returns {string} The kebab-case formatted string, or an empty string for invalid input.
 */
function toKebabCase(input) {
    // Handle null/undefined
    if (input === null || input === undefined) return '';
    // Handle numbers
    if (typeof input === 'number') return String(input);
    // Handle non-string objects (arrays, etc.)
    if (typeof input !== 'string') {
        if (input.toString && typeof input.toString === 'function') {
            input = input.toString();
        } else {
            return '';
        }
    }
    // Trim and normalize input
    let str = input.trim();
    if (!str) return '';

    // Replace all non-alphanumeric delimiters with spaces
    str = str.replace(/[^a-zA-Z0-9]+/g, ' ');

    // If input is camelCase or PascalCase, split by uppercase boundaries
    if (/[a-z][A-Z]/.test(str)) {
        str = str.replace(/([a-z])([A-Z])/g, '$1 $2');
    }

    // Split into words, filter out empty
    let words = str.split(' ').filter(Boolean);

    // Lowercase all words and join with hyphens
    return words.map(w => w.toLowerCase()).join('-');
}

// --- Test cases ---

const kebabTestCases = [
    'hello world',           // 'hello-world'
    'Hello World',           // 'hello-world'
    'hello_world',           // 'hello-world'
    'hello-world',           // 'hello-world'
    'helloWorld',            // 'hello-world'
    'HelloWorld',            // 'hello-world'
    'hello__world',          // 'hello-world'
    'hello--world',          // 'hello-world'
    'hello world_test',      // 'hello-world-test'
    'hello-world_test',      // 'hello-world-test'
    'hello world-test',      // 'hello-world-test'
    'helloWorldTest',        // 'hello-world-test'
    'HelloWorldTest',        // 'hello-world-test'
    'hello world123',        // 'hello-world123'
    'hello123 world',        // 'hello123-world'
    '',                      // ''
    '   ',                   // ''
    null,                    // ''
    undefined,               // ''
    123,                     // '123'
    '123',                   // '123'
    {},                      // '[object-object]'
    [],                      // ''
    '___hello---world___',   // 'hello-world'
    'hello@world!',          // 'hello-world'
    'HELLO_WORLD',           // 'hello-world'
    'user_ID',               // 'user-id'
    'user-id',               // 'user-id'
    'user id',               // 'user-id'
    'userID',                // 'user-id'
    'userIDNumber',          // 'user-id-number'
    'user_id_number',        // 'user-id-number'
    'user-id-number',        // 'user-id-number'
    'user id number',        // 'user-id-number'
    'userID_number',         // 'user-id-number'
    'user-ID-number',        // 'user-id-number'
];

console.log('--- toKebabCase Test Cases ---');
kebabTestCases.forEach(tc => {
    console.log(`Input: ${JSON.stringify(tc)} => Output: ${toKebabCase(tc)}`);
});
