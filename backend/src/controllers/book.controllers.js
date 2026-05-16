import jwt from 'jsonwebtoken';
import validator from 'validator';
import { query } from '../config/db.js'
async function createBook(req,res){
    try{
        const {title,description} = req.body;

        const user = req.user.id;
        if(!user){
            return res.status(404).json({
                message: "User not found!"
            })
        }
        const result = await query(
            `INSERT INTO ebooks(user_id,book_title,description) VALUES
            ($1,$2,$3) RETURNING *`,[user,title,description]
        );
        return res.status(201).json({
            message:"Created an E-Book Successfully",
            book: result.rows[0]
        })
    }
    catch(err){
        return res.status(500).json({
            message:"Server error: "+err.message
        })
    }
}

async function addCover(req,res){
    try{

    } catch(err){
        return res.status(500).json({
            message: "Server Error: "+err.message
        })
    }
}

async function getBooks(req,res){
    try{
        const result = await query(
            `SELECT * FROM ebooks`);
        return res.status(200).json({
            message: "Fetched all the EBooks! ",
            books: result.rows
        })
    } catch(err){
        return res.status(500).json({
            message: "Server Error: "+err.message
        })
    }
}
async function updateEbook(req,res){
    try{
        const {title,url,description} = req.body;
        const bookId = req.params.id;
        if(!validator.isUUID(bookId)){
            return res.status(400).json({
                message: "Invalid UUID"
            })
        }
        const book = await query(
            `select * from ebooks where book_id=$1`,
            [bookId]
        );

        if(book.rows.length===0){
            return res.status(404).json({
                message: "Book not found"
            })
        }
        const result = await query(
            `UPDATE ebooks set book_title=$1,cover_image_url=$2,description=$3 where book_id=$4 RETURNING *`,
            [title,url,description,bookId]
        );
        return res.status(200).json({
            message:"Updated title of the ebook",
            book: result.rows[0]
        })
    } catch(err){
        return res.status(500).json({
            message: "Server Error: "+err.message
        })
    }
}

async function deleteEbook(req,res){
    try{
        const bookId = req.params.id;

        if(!validator.isUUID(bookId)){
            return res.status(400).json({
                message: "Invalid ID"
            })
        }
        const book = await query(
            `select * from ebooks where book_id=$1`,
            [bookId]
        );

        if(book.rows.length===0){
            return res.status(404).json({
                message: "Book not found"
            })
        }
        const result = await query(
            `DELETE FROM ebooks where book_id=$1`
            ,[bookId]);
        
        return res.status(200).json({
            message: "Deleted an E-Book",
            book: book.rows[0]
        })
        
    } catch(err){
        return res.status(500).json({
            message: "Server Error: "+err.message
        })
    }
}
export default {createBook,getBooks,updateEbook,deleteEbook};