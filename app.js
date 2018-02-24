//P2 assignment for Web server programing

const express = require('express')
const session = require('express-session')

const app = express();
app.set('view engine','ejs')
app.set('views', './ejs_views')

app.use(express.urlencoded({extended: false}))
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
    
    res.render('index')

})

app.post('/',(req,res) => {
    console.log('session visted is ' + $req.session.visited)
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is running at port', port);
});
