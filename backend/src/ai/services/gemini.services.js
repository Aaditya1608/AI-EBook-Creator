import model from '../gemini.client.js';
import outlinePrompt from '../prompts/outline.prompt.js';
import chapterPrompt from '../prompts/chapter.prompt.js';
import cleanJSON from '../utils/cleanJSON.js';

export async function generateOutline(title, chapters) {
    const prompt = outlinePrompt(title, chapters);
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const cleaned = cleanJSON(responseText);
    
    try {
        return JSON.parse(cleaned);
    } catch (err) {
        throw new Error("Failed to parse Gemini output as JSON: " + cleaned);
    }
}

export async function generateChapter(ebookTitle, chapterTitle) {
    const prompt = chapterPrompt(ebookTitle, chapterTitle);
    const result = await model.generateContent(prompt);
    return result.response.text();
}
