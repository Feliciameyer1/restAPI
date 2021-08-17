const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose= require('mongoose');
const errorHandler = require('./middleware/errorhandler');
const rateLimit= require('express-rate-limit');

const postRoutes = require('./routes/post');
const authRoutes= require('./routes/auth');
const followRoutes= require('./routes/follow');

const passportJWT = require('./middleware/passport.jwt')();
const { groupCollapsed } = require('console');
const app = express();
app.use(cors());

/* app.enable("trust proxy");
const limiter = rateLimit({
    windowMs:15*1000,
    max:5
});
app.use(limiter); */
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin:UPukgGQOwwCH5HsE@it499website.dbgwf.mongodb.net/NodeExpressPractice?retryWrites=true&w=majority',
{useNewUrlParser:true});



app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(passportJWT.initialize());


app.use('/api/auth', authRoutes);
app.use('/api/post', passportJWT.authenticate(),postRoutes);
app.use('/api/follow', passportJWT.authenticate(),followRoutes);

app.use(errorHandler);
app.listen(8000,()=>{
    console.log("the server is listening on port 8000");
});