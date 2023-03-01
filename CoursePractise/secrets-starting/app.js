//jshint esversion:6
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
var findOrCreate = require('mongoose-findorcreate')



const bcrypt = require('bcrypt');
const salt = 10;

const app = express();
app.use(express.json());
require('dotenv').config();
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));

//Setting up the session
app.use(session({
    secret : 'My little secret.',
    resave : false,
    saveUninitialized : false
}))

//initializing the passport
app.use(passport.initialize());

//passport dealing with session
app.use(passport.session());

app.set('view engine' , 'ejs');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/secretsDB');


//The schmea has to be the mongoose schema
const userSchema = new mongoose.Schema ({
    email : String,
    password : String
});
// userSchema.plugin(encrypt, { secret: process.env.SECRET,   encryptedFields: ['password']});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);


const User = mongoose.model('User' , userSchema);

passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

passport.serializeUser(function(user,done){
    done(null, user.id);
})

passport.deserializeUser(function(id , done){
    User.findById(id , function(err , user){
        done(err ,user);
    })
})

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL : "https://www.goggleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


app.get('/' , function(req,res){
    res.render('home');
})

app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile"] }));

  app.get("/auth/google/secrets", 
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');
  });

app.get('/login' , function(req,res){
    res.render('login');
})

app.get('/register' , function(req,res){
    res.render('register');
})

app.get('/secrets' , function(req,res){
    if(req.isAuthenticated()){
        res.render('secrets');
    }
    else{
        res.redirect('/login');
    }
})

app.get('/logout' , function(req,res){
    req.logout(function(err) {
        if (err) { console.log(err) }
        res.redirect('/');
      });
})

app.post('/register' , function(req,res){
    User.register({username : req.body.username} , req.body.password , function(err , user){
        if(err){
            console.log(err);
            res.render('register');
        }else{
            //storing the user credentials in the cookie
            passport.authenticate("local")(req,res , function(){
                res.redirect('/secrets');
            })
        }
    })
  
})



app.post('/login' , function(req,res){
   const user = new User({
    username : req.body.username,
    password : req.body.password 
   })

   req.login(user, function(err){
    if(err){
        console.log(err)
    }else{
        passport.authenticate('local')(req,res,function(){
            res.redirect('/secrets');
        })
    }
   })
})

app.listen('3000' , function(){
    console.log('Server Listening to the port 3000');
})