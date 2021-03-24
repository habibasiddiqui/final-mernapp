const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const dbConnect = require('./config/db.js');
var cors = require('cors');
const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);
const userRoute = require('./routes/api/users')
const postRoute = require('./routes/api/posts') 
const PORT = process.env.PORT || 4000;


app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '30mb' }));


// connect to db
dbConnect();


// to start app
app.listen(PORT, (req,res)=>{
console.log('server is running at', PORT)
})




// Routes
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);

