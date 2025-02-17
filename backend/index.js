const express= require('express');
const app = express();
const port =5000
const mongoDB= require('./db');
mongoDB();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, delete');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  
    next();
  });

app.get("/", (req, res)=>{
    res.send("Hello")
})
app.use(express.json())
app.use('/api', require("./Routes/CreateUser"))

app.use('/api', require("./Routes/DisplayData"))
app.use('/api', require("./Routes/OrderData"))

app.listen(port, ()=>{
    console.log(`listening to the port ${port}`);
})