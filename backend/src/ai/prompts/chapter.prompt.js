function chapterPrompt(ebookTitle, chapterTitle) {
    return `
        You are an expert ebook writer.
        
        Write the full, detailed content for a chapter titled "${chapterTitle}".
        This chapter belongs to an ebook titled "${ebookTitle}".
        
        Provide the content in rich Markdown format. Ensure it is engaging, informative, and flows well.
        Do not include any JSON formatting or metadata, just the raw markdown content of the chapter itself.
    `;
}

export default chapterPrompt;
