function chapterPrompt(ebookTitle,chapterTitle){
    return `
        You are an expert ebook writer.

        Write detailed markdown content for the chapter:
        "${chapterTitle}"

        The ebook title is:
        "${ebookTitle}"

        Use:
        - headings
        - bullet points
        - examples
        - proper markdown formatting

        Return markdown only.
    `;
}
export default chapterPrompt;