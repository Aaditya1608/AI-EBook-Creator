import jwt from 'jsonwebtoken';
import validator from 'validator';
import { query } from '../config/db.js'
async function createBook(req,res){
    try{
        const {title} = req.body;

        const user = req.user.id;
        if(!user){
            return res.status(404).json({
                message: "User not found!"
            })
        }
        const result = await query(
            `INSERT INTO ebooks(user_id,book_title) VALUES
            ($1,$2) RETURNING *`,[user,title]
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
        const {title} = req.body;
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
            `UPDATE ebooks set book_title=$1 where book_id=$2 RETURNING *`,
            [title,bookId]
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
export default {createBook,getBooks,updateEbook};