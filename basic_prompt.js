function toCamelCase(str) {
    return str
        .split(' ')
        .map((word, idx) => {
            if (!word) return '';
            const lower = word.toLowerCase();
            return lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join('');
}

// Example usage:
console.log(toCamelCase('baburao ganpatrao apte')); // BaburaoGanpatraoApte