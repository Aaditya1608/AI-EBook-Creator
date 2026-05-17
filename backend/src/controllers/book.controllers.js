import jwt from 'jsonwebtoken';
import validator from 'validator';
import s3 from '../services/s3.js';
import { query } from '../config/db.js'
import { PutObjectCommand } from '@aws-sdk/client-s3';
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
        if(!req.file){
            return res.status(400).json({
                message: "Cover Image is required"
            })
        }
        const file = req.file;


        const fileName = `${Date.now()}-${file.originalname}`;

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype
        };

        await s3.send(new PutObjectCommand(params));
        const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

        const bookId = req.params.id;

        if(!validator.isUUID(bookId)){
            return res.status(400).json({
                message: "Invalid Book ID"
            })
        }

        const result = await query(
            `SELECT * from ebooks where book_id=$1 and user_id=$2`,
            [bookId,req.user.id]
        )
        if(result.rows.length===0){
            return res.status(404).json({
                message: "Book not found"
            })
        }

        const book = await query(
            `UPDATE ebooks set cover_image_url=$1,cover_image_key=$2 where book_id=$3 and user_id=$4 RETURNING *`,
            [imageUrl,fileName,bookId,req.user.id]
        );

        return res.status(201).json({
            message: "Successfully added cover image!",
            book: book.rows[0]
        })

    } catch(err){
        return res.status(500).json({
            message: "Server Error: "+err.message
        })
    }
}

async function getBooks(req,res){
    try{
        console.log(req.user.id);
        const result = await query(
            `SELECT * FROM ebooks where user_id=$1`,[req.user.id]);
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
            `select * from ebooks where book_id=$1 and user_id=$2`,
            [bookId,req.user.id]
        );

        if(book.rows.length===0){
            return res.status(404).json({
                message: "Book not found"
            })
        }
        const result = await query(
            `UPDATE ebooks set book_title=$1,cover_image_url=$2,description=$3 where book_id=$4 and user_id=$5 RETURNING *`,
            [title,url,description,bookId,req.user.id]
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
            `select * from ebooks where book_id=$1 and user_id=$2`,
            [bookId,req.user.id]
        );

        if(book.rows.length===0){
            return res.status(404).json({
                message: "Book not found"
            })
        }
        const result = await query(
            `DELETE FROM ebooks where book_id=$1 and user_id=$2`
            ,[bookId,req.user.id]);
        
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
export default {createBook,getBooks,updateEbook,deleteEbook,addCover};