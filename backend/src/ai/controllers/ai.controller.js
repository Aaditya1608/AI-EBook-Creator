import {
    generateOutline,
    generateChapter
} from '../services/gemini.services.js';

import { query } from '../../config/db.js';

async function generateOutlineController(req,res){

    try{
        const ebookId = req.params.id;
        const userId = req.user.id;

        const { chapters } = req.body;

        if(!chapters){
            return res.status(400).json({
                message: "Number of chapters required"
            });
        }

        const ebookResult = await query(
            `SELECT * from ebooks
            Where book_id=$1 and user_id=$2`,
            [ebookId,userId]
        );
        const ebook = ebookResult.rows[0];
        if(!ebook){
            return res.status(404).json({
                message: "Ebook not found"
            })
        }

        const outline = await generateOutline(
            ebook.book_title,
            chapters
        );

        for(const chapter of outline){
            await query(
                `
                INSERT INTO chapters
                (
                    book_id,
                    chapter_title,
                    chapter_number
                )
                VALUES ($1,$2,$3)
                `,
                [
                    ebookId,
                    chapter.chapter_title,
                    chapter.chapter_number
                ]
            );
        }
        return res.status(200).json({
            message: "Outline generated successfully",
            outline
        });
    } catch(err){

        return res.status(500).json({
            message: err.message
        });

    }
}

async function generateChapterController(req,res){

    try{

        const chapterId = req.params.id;
        const userId = req.user.id;

        // Get chapter + ebook ownership
        const chapterResult = await query(
            `
            SELECT chapters.*, ebooks.book_title
            FROM chapters
            JOIN ebooks
            ON chapters.book_id = ebooks.book_id
            WHERE chapters.chapter_id=$1
            AND ebooks.user_id=$2
            `,
            [chapterId,userId]
        );

        const chapter = chapterResult.rows[0];

        if(!chapter){
            return res.status(404).json({
                message: "Chapter not found"
            });
        }

        // Generate content
        const content = await generateChapter(
            chapter.book_title,
            chapter.chapter_title
        );

        // Save generated content
        const updatedChapter = await query(
            `
            UPDATE chapters
            SET chapter_content=$1
            WHERE chapter_id=$2
            RETURNING *
            `,
            [content,chapterId]
        );

        return res.status(200).json({
            message: "Chapter generated successfully",
            chapter: updatedChapter.rows[0]
        });
    } catch(err){

        return res.status(500).json({
            message: err.message
        });

    }
}

export default {generateChapterController,generateOutlineController};