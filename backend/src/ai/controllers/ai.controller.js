import { generateOutline, generateChapter } from '../services/gemini.services.js';
import { query } from '../../config/db.js';

async function generateOutlineController(req, res) {
    try {
        const ebookId = req.params.id;
        const userId = req.user?.id; // Assuming auth middleware provides this
        
        const { chapters } = req.body;

        if (!chapters) {
            return res.status(400).json({ message: "Number of chapters required" });
        }

        // Verify ebook exists and user owns it
        let queryParams = [ebookId];
        let queryString = `SELECT * FROM ebooks WHERE book_id=$1`;
        
        if (userId) {
            queryString += ` AND user_id=$2`;
            queryParams.push(userId);
        }

        const ebookResult = await query(queryString, queryParams);
        const ebook = ebookResult.rows[0];

        if (!ebook) {
            return res.status(404).json({ message: "Ebook not found or unauthorized" });
        }

        // Generate outline
        const outline = await generateOutline(ebook.book_title, chapters);

        // Insert chapters into DB
        const insertedChapters = [];
        for (const [index, chapter] of outline.entries()) {
            const insertResult = await query(
                `
                INSERT INTO chapters
                (
                    book_id,
                    chapter_title,
                    chapter_number
                )
                VALUES ($1, $2, $3)
                RETURNING *
                `,
                [
                    ebookId,
                    chapter.chapter_title || chapter.title,
                    chapter.chapter_number || chapter.number || index + 1
                ]
            );
            insertedChapters.push(insertResult.rows[0]);
        }

        return res.status(200).json({
            message: "Outline generated successfully",
            outline: insertedChapters
        });
    } catch (err) {
        console.error("Generate Outline Error:", err);
        return res.status(500).json({ message: err.message });
    }
}

async function generateChapterController(req, res) {
    try {
        const chapterId = req.params.id;
        const userId = req.user?.id; // Assuming auth middleware

        // Get chapter + ebook details to ensure ownership and fetch titles
        let queryString = `
            SELECT chapters.*, ebooks.book_title
            FROM chapters
            JOIN ebooks ON chapters.book_id = ebooks.book_id
            WHERE chapters.chapter_id=$1
        `;
        let queryParams = [chapterId];
        
        if (userId) {
            queryString += ` AND ebooks.user_id=$2`;
            queryParams.push(userId);
        }

        const chapterResult = await query(queryString, queryParams);
        const chapter = chapterResult.rows[0];

        if (!chapter) {
            return res.status(404).json({ message: "Chapter not found or unauthorized" });
        }

        // Generate content
        const content = await generateChapter(chapter.book_title, chapter.chapter_title);

        // Save generated content
        const updatedChapter = await query(
            `
            UPDATE chapters
            SET chapter_content=$1
            WHERE chapter_id=$2
            RETURNING *
            `,
            [content, chapterId]
        );

        return res.status(200).json({
            message: "Chapter generated successfully",
            chapter: updatedChapter.rows[0]
        });
    } catch (err) {
        console.error("Generate Chapter Error:", err);
        return res.status(500).json({ message: err.message });
    }
}

export default { generateOutlineController, generateChapterController };
