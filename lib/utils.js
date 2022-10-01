const crypto = require('crypto');
// const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

//generate salt, hash for user password at registeration
function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    return {
      salt: salt,
      hash: genHash
    };
}

//verify password during login
function validPassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

//issue jwt during login after password hass been verified 
function issueJWT(user) {
    const _id = user._id;
    const expiresIn = '1m';
    const payload = {
      sub: _id,
      iat: Date.now()
    }
    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });
    return {
      token: "Bearer " + signedToken,
      expires: expiresIn
    }
  }

module.exports.genPassword = genPassword;
module.exports.validPassword = validPassword;
module.exports.issueJWT = issueJWT;



