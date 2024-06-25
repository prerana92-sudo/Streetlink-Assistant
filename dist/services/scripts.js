"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUniqueValuesAndDuplicates = void 0;
function fetchUniqueValuesAndDuplicates(numbers) {
    const counts = {};
    const uniqueValues = [];
    const duplicateValues = [];
    numbers.forEach((num) => {
        counts[num] = (counts[num] || 0) + 1;
    });
    for (const num in counts) {
        if (counts[num] > 1) {
            duplicateValues.push(parseInt(num));
        }
        else {
            uniqueValues.push(parseInt(num));
        }
    }
    console.log(uniqueValues);
    console.log(duplicateValues);
    return {};
}
exports.fetchUniqueValuesAndDuplicates = fetchUniqueValuesAndDuplicates;
//# sourceMappingURL=scripts.js.map