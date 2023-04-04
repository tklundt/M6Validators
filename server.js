//Environment Variables
const dotenv = require('dotenv');
dotenv.config({ path: './config.env'});

//Node.js Express Server
const express = require('express');
const app = express();

//Middleware Parsing
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

//Path
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

//Viewengine (EJS)
app.set('view engine', 'ejs');
app.set('views', 'views');

//Routes
const validatorRoute = require('./routes/validatorRoute');
app.use('/api', validatorRoute);

//404 Page
app.use((err, req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found'});
});

//Database Connection (Mongoose)
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://tklundtuser:1234letmein@cluster0.lemo6kb.mongodb.net/bank', {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connection Opened'))
    .catch((err) => console.error(err));

//Server Listener
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});