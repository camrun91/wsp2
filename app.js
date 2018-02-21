//P2 assignment for Web server programing

const express = require('express')
const session = require('express-session')

const app = express();
app.set('view engine','ejs')
app.set('views', './ejs_views')

app.use(express.urlencoded({extended: false}))
app.use(session({
	secret: '',
	resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60*60, // if inactive, session expires in 1 hour
        path: '/'
    }
}));