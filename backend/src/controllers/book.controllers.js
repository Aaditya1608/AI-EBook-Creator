import jwt from 'jsonwebtoken';
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

export default {createBook};