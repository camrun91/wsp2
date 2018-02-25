//P2 assignment for Web server programing

const express = require('express')
const session = require('express-session')
const expressValidator = require('express-validator')
const app = express();
app.set('view engine','ejs')
app.set('views', './ejs_views')

app.use(express.urlencoded({extended: false}))
app.use(expressValidator())
app.use(session({
	secret: 'SuperSecrettestKey',
	resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60*60, // if inactive, session expires in 1 hour
        path: '/'
    }
}))
app.get('/', (req,res) => {
    if(!req.session.input){
        req.session.input = true
    }
    res.render('index')
})

app.post('/',(req,res) => {
    req.session.input = req.body
req.sanitizeBody('city').blacklist(/(-- Choose --)/)
req.checkBody('email',"Email Must contain @.").matches(/\@/)
req.checkBody('password', "Password must be at least 4 chars long.").len(4)
req.checkBody('ps', "You must choose some skills").notEmpty()
req.checkBody('major', "You must choose one Major").notEmpty()
req.checkBody('city', "A city must be selected.").notEmpty()
if(!req.validationErrors())
    return res.render('userinfo',req.session.input)
else {let errors = req.validationErrors(true) 
    req.session.errors = errors
    return res.render('index',req.session)}    
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is running at port', port);
});
