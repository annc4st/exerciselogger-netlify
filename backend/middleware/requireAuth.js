const jwt  = require('jsonwebtoken')
const User = require ('../models/userModel')

const requireAuth = async (req, res, next) => {
       //verify auth
    //can grab auth property from req headers
    const {authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error : 'Authorization token required'})
    }

    //get token from authorization "Bearer lskjfslfks098sfs.slkjhfw.oisfjosd"
    const token = authorization.split(' ')[1]
    if (!token) return res.status(401).json({ error: "No token provided" });

    try {
        const {_id} = jwt.verify(token, process.env.SECRET)
        console.log("Token verified, user ID:", _id);
        req.user = await User.findOne({ _id }).select('_id')
        // req.user = await User.findById({_id}).select('_id')
        if (!req.user) {
            console.log("User not found");
            return res.status(401).json({ error: 'User not found' });
          }
          /// Proceed to next middleware/route handler
        next()

    } catch(error) {
        console.log("Error verifying token:", error);
        console.error('Authentication error:', error);
        res.status(401).json({error: 'Request is not authorized'})
    }
 }

 module.exports = requireAuth;