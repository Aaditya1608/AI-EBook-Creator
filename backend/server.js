require('dotenv').config();
const app = require('./src/app.js');

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`Backend running on Port ${PORT}`)
})