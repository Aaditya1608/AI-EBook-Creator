function cleanJSON(jsonString) {
    let cleanString = jsonString;
    if (cleanString.startsWith('```json')) {
        cleanString = cleanString.replace(/^```json/, '');
    }
    if (cleanString.endsWith('```')) {
        cleanString = cleanString.replace(/```$/, '');
    }
    return cleanString.trim();
}

export default cleanJSON;
