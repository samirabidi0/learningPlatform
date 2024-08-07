
const express = require('express')
const router = express.Router()
const verifyToken = require ('../Controllers/MiddlewareJWT.js')
const { register, login,validateRegister } = require('../Controllers/Authentication.js');

router.post('/login', login);
router.post('/register', register,validateRegister);

router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: "This is a protected route" });
});

module.exports = router;
