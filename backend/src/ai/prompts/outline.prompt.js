function outlinePrompt(title, chapters) {
    return `
        You are an expert ebook writer.
        
        Generate exactly ${chapters} chapter titles for an ebook called:
        "${title}"
        
        Return ONLY a valid JSON array of objects. Do not include markdown formatting or additional text.
        
        Example:
        [
            {
                "chapter_number": 1,
                "chapter_title": "Introduction to the Topic"
            },
            {
                "chapter_number": 2,
                "chapter_title": "Deep Dive into Basics"
            }
        ]
    `;
}

export default outlinePrompt;
