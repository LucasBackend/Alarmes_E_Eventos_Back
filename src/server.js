require('express-async-errors');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const appError = require('./utils/app.Error')

const routers = require('./routes/index')

app.use(cors());

app.use(express.json());

app.use(routers);

app.use((error,request,response,next)=>{
    if(error instanceof appError){
        response.status(error.statusCode).json({
            status:"error",
            message:error.message
        })
    }else{
        response.status(500).json({
            status:500,
            message:error.message
        })
    }
})

const PORT = process.env.PORT || 3333

app.listen(PORT,()=>{
    console.log(`app ouvindo na porta ${PORT}`)
})