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
let errors={errors:[]}
app.get('/', (req,res) => {
    res.render('index',errors)
    console.log(errors);
})

app.post('/',(req,res) => {
    req.session.body = req.body
req.checkBody('email',"Email Must contain @.").matches(/\@/)
req.checkBody('password', "Password must be at least 4 chars long.").len(4)
req.checkBody('ps', "You must choose some skills").notEmpty()
req.checkBody('major', "You must choose one Major").notEmpty()
if(!req.validationErrors())
    return res.render('userinfo',req.session.body)
else {errors = req.validationErrors(true) 
    console.log(errors);
    return res.render('index',errors)}

})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is running at port', port);
});
