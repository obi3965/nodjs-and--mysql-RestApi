const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors')

const app = express();

const indexRouter = require('./routes/index')

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());




app.use('/api', indexRouter)
const port = process.env.PORT || 7070;
app.listen(port, function(){
    console.log(`server is running at : http://localhost:${port}`)
})