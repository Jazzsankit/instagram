const express = require('express');
const connection = require('./model/db');
const { use } = require('./router/postRouter');
const postRouter = require('./router/postRouter');
const requestRouter = require('./router/requestRouter');
const userRouter = require('./router/userRouter');

const app = express(); //top level express function
app.use(express.json()); // so that we can send data request body

app.use("/api/user",userRouter);

app.use("/api/post",postRouter);

app.use("/api/request",requestRouter);




app.listen(3000,function(){
    console.log("app is running in port 3000")
})

