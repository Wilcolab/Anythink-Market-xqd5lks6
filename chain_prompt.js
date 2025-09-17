/**
 * Converts a string to kebab-case.
 * Handles spaces, camelCase, PascalCase, snake_case, and mixed delimiters.
 * Removes special characters, validates input, and normalizes output.
 * @param {any} input
 * @returns {string}
 */
function toKebabCase(input) {
    if (typeof input !== 'string') {
        throw new TypeError('Input must be a string');
    }
    let str = input.trim();
    if (str.length === 0) return '';

    // Replace underscores and spaces with hyphens
    str = str.replace(/[_\s]+/g, '-');

    // Insert hyphens before uppercase letters (for camelCase/PascalCase)
    str = str.replace(/([a-z0-9])([A-Z])/g, '$1-$2');
    str = str.replace(/([A-Z])([A-Z][a-z])/g, '$1-$2');

    // Remove non-alphanumeric/hyphen characters
    str = str.replace(/[^a-zA-Z0-9-]+/g, '');

    // Convert to lowercase and collapse multiple hyphens
    str = str.toLowerCase().replace(/-+/g, '-');

    // Remove leading/trailing hyphens
    str = str.replace(/^-+|-+$/g, '');

    return str;
}

// Test cases
const tests = [
    { input: 'Hello World', expected: 'hello-world' },
    { input: 'helloWorld', expected: 'hello-world' },
    { input: 'HelloWorld', expected: 'hello-world' },
    { input: 'hello_world', expected: 'hello-world' },
    { input: 'hello-World_test', expected: 'hello-world-test' },
    { input: '  MixedCASE_string Example ', expected: 'mixed-case-string-example' },
    { input: 'special@#Chars!', expected: 'special-chars' },
    { input: '', expected: '' },
    { input: null, expectedError: true },
    { input: undefined, expectedError: true },
    { input: 12345, expectedError: true },
];

for (const { input, expected, expectedError } of tests) {
    try {
        const result = toKebabCase(input);
        console.log(`Input: ${JSON.stringify(input)} | Output: ${result} | ${result === expected ? 'PASS' : 'FAIL'}`);
    } catch (e) {
        if (expectedError) {
            console.log(`Input: ${JSON.stringify(input)} | Error: ${e.message} | PASS`);
        } else {
            console.log(`Input: ${JSON.stringify(input)} | Unexpected Error: ${e.message} | FAIL`);
        }
    }
}