const express = require('express');
const app = express();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

passport.use(new FacebookStrategy({
    clientID: "198443390954865",
    clientSecret: "51a0cc999877689fef303809efc3d071",
    callbackURL: "/facebook/callback"
},
    (accessToken, refreshToken, profile, done) => {
        User.findOrCreate((err, user) => {
            if (err) { return done(err); }
            done(null, user);
        });
    }
));

app.get('/', (req, res) => {
    res.render('index');
})
app.get('/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/welcome',
        failureRedirect: '/'
    })
);

app.get('/welcome', (req, res) => {
    res.send("Hello User");
})

app.listen(3000, () => {
    console.log("Server OPEN");
})