import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/db.js'

async function signUp(req,res){
    try {
        const { name,email,password } = req.body;

        const existingUser = await query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );

        if(existingUser.rows.length>0){
            return res.status(400).json({
                message: 'User already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const result = await query(
            `INSERT INTO users (name,email,hash_password)
             VALUES ($1,$2,$3) 
             RETURNING user_id,name,email`,
             [name,email,hashedPassword]
        )

        const newUser = result.rows[0];

        const token = jwt.sign(
            { id: newUser.user_id },
            process.env.JWT_KEY,
            {expiresIn: '7d'}
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: false
        });

        res.status(201).json({
            message: 'User successfully signed up',
            token,
            newUser
        });


    } catch(err){
        res.status(500).json({
            message: 'Server Error: '+err.message
        })
    }
}

async function logIn(req,res){
    try{
        const {email,password} = req.body;

        if(!email||!password){
            return res.status(400).json({
                message:"Email and password required!"
            })
        }
        const result = await query(
            `SELECT * FROM users where email=$1`,
            [email]
        )
        const user = result.rows[0];
        if(!user){
            return res.status(404).json({
                message:"User not registered"
            })
        }

        const isMatch = await bcrypt.compare(password,user.hash_password);

        if(!isMatch){
            return res.status(401).json({
                message:"Password entered Incorrectly",
            })
        }

        const token = jwt.sign({id: user.user_id},
            process.env.JWT_KEY,
            {expiresIn:'7d'}
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: false
        });
        return res.status(200).json({
            message: "User signed in successfully",
            user: {
                user_id: user.user_id,
        name: user.name,
        email: user.email
            }
        })
    } catch(err){
        return res.status(500).json({
            message: "Server Error: "+err.message,
        })
    }
}

export default {signUp,logIn}; 