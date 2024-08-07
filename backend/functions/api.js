const express = require('express')
const serverlessHttp = require('serverless-http')
const cors = require('cors');
// const router = express.Router();


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/.netlify/functions/api', (req, res) => {
    return res.json({message: "Hello!"})
})

// app.get('/', (req, res) => {
//     return res.json({message: "Hello!"})
// })

// module.exports = router;



module.exports.handler = serverlessHttp(app);