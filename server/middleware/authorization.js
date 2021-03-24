const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const auth = async (req, res, next) => {
    try {
        console.log(req.headers)
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = {
            email: decodedToken.email,
            id: decodedToken.id
        }; 
        next();
    } catch (error) {
        res.json({ 
            status: 400,
            message: "Auth failed!" });
    }
};

module.exports = auth