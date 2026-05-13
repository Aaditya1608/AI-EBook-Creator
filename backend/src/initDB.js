import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {pool}  from "./config/db.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function initDB() {
    try {
        const schemaPath = path.join(__dirname,"database/schema.sql");

        const sql = fs.readFileSync(schemaPath,"utf-8");

        await pool.query(sql);

        console.log("DB initialised");
    } catch(err){
        console.error("DB Init Error: ",err.message);
    }
}