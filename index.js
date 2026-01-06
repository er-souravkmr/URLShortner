import express from 'express';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000; // Access variables via process.env




app.get('/getcode' , (req , res)=>{
    try {



        
       res.status(200).json({message : 'Working Fine'}); 
    } catch (error) {
        res.status(500).json({success : false , message : error.message});
    }
})


app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}` );
})