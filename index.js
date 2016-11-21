const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const Story = require('./models/story')
const Person = require('./models/person')
const Comment = require('./models/comment')
const cons = require('consolidate')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();

app.use(cors());

app.use( bodyParser.json() );  

app.use(bodyParser.urlencoded({     
  extended: true
})); 

app.use(expressSession({
    secret: 'crackalackin',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {


  	Person.findOrCreate({facebookID:profile.id}, function(err, user) {
      if (err) { return done(err); }

      user.name = profile.displayName;
      user.save();

      done(null, user);
    });
  }
));



app.set('view engine', 'hbs');
app.set('views', __dirname + '/views')

var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

app.get('/login',(req,res) =>{
	res.render('login')
})

app.get('/dashboard',(req,res) =>{
	res.render('dashboard',{user:req.user})
})

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
passport.authenticate('facebook', { successRedirect: '/dashboard',
                                      failureRedirect: '/login' }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Person.findById(id, function(err, user) {
    done(err, user);
  });
});




app.get('/stories',isAuthenticated,(req, res) => {

	let find = Story
	.find()
	.populate('_creator')
	.exec((err, story) => {
	  if (err) return res.send(err);
	  res.json(story);
	});

})

app.post('/story',isAuthenticated,(req, res) => {
	
	let story1 = new Story({
		title:req.body.title,
		description:req.body.description,
		_creator: 0 
	});
	  
	story1.save((err) => {
		if (err) {
			res.send({error:err});
			return;
		} ;
		res.send({success:"yay"})
	});
})


function isAuthenticated(req, res, next) {
    if (req.user.admin)
        return next();
    res.redirect('/login');
}


app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
