const jwt = require("jsonwebtoken");

// Middeware for Generating a new JWT Token
const generateToken = (req, res, next) => {
    let token = jwt.sign({ email: req.body.email }, process.env.PRIVATE_KEY, { expiresIn: '1hour' });
    res.header('auth-token', token);
    next();
};

module.exports = {
    generateToken
};