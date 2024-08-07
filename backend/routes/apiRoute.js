const express = require('express');
 
const router = express.Router();
 
//Route

router.get('/', (req, res) => {
    return res.json({message: "Hello!"})
})
 
module.exports = router;