const express = require('express');
const app = express();
const PORT = 3000;



app.listen(PORT,(err)=>{
    if(err){
        console.log(`Unable to Start Server at ${PORT}`);
    }
    else{
        console.log(`Server Started at ${PORT}`);
    }
})