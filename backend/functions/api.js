const express = require('express')
const serverlessHttp = require('serverless-http')


const app = express();

app.get('/.netlify/functions/api', (req, res) => {
    return res.json({message: "Hello!"})
})


const handler = serverlessHttp(app)


module.exports.handler = async (event, context) => {
    const result = await handler (event, context);
    return result
}