function outlinePrompt(title,chapters){
    return `
        You are an expert ebook writer.

        Generate exactly ${chapters} chapter titles
        for an ebook called:

        "${title}"

        Return ONLY valid JSON array.

        Example:
        [
            {
                "chapter_number":1,
                "title":"Introduction ...."
            },

        ]
    `;
}

export default outlinePrompt;