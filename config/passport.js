const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const fs = require('fs')
const path = require('path')
const User = require('../models/userModel')
const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem')
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
}

const strategy = new JwtStrategy(options, function(jwt_payload, done) {
    console.log('jwt-payload -', jwt_payload); //for output see below, works on protected routes by extracting jwt from req.header.auth only obviously like post quotes
        User.findOne({_id: jwt_payload.sub}, function(err, user) {
            console.log('user- ', user)       // for output see below 
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            } 
        })
})

//verify callback -> new jwtstrategy
module.exports = (passport) => {
    passport.use(strategy);
}



/*
jwt-payload - {
  sub: '62e8e359....',
  iat: 16597.. issue at,
  exp: 16655.. exp at,
}

user-  {
  _id: new ObjectId("62e8e359...."),
  username: 'some username',
  email: 'some email',
  hash: 'some hash',
  salt: 'some salt',
  __v: 0
}
*/





// //verify callback > new jwtstrategy
// module.exports = (passport) => {
//     passport.use(new JwtStrategy(options, function(jwt_payload, done) {
//         console.log(jwt_payload);
//         User.findOne({_id: jwt_payload.sub}, function(err, user) {
//             if (err) {
//                 return done(err, false);
//             }
//             if (user) {
//                 return done(null, user);
//             } else {
//                 return done(null, false);
//             } 
//         });
//     }));
// }
