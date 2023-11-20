require('express-async-errors');
const express = require('express');
const cors = require('cors');
const app = express();
const appError = require('./utils/app.Error')

const routers = require('./routes/index')

app.use(cors());
app.use(routers);
app.use(express.json({ limit: '10mb' }));

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

const PORT = 3333

app.listen(PORT,()=>{
    console.log(`app ouvindo na porta ${PORT}`)
})