const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../../models/tables/users');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ where: { email: profile.emails[0].value } });

        if (!user) {
            const randomNumbers = Math.floor(Math.random() * 10000);
            user = await User.create({
                email: profile.emails[0].value,
                name: profile.displayName,
                username: `${profile.displayName.replace(/\s+/g, '')}${randomNumbers}`,
                password: null 
            });
            console.log('New user created:', user);
        } else {
            console.log('Existing user found:', user);
        }
        
        done(null, { ...user.get(), profilePhoto: profile.photos[0].value }); 
    } catch (err) {
        done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    console.log('Serializing user:', user); 
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return done(new Error('User not found'), null);
        }
        done(null, user); 
    } catch (err) {
        done(err, null); 
    }
});
