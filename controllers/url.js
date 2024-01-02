const shortidd = require("shortid")
const URL = require("../models/url")
async function generateShortUrl(req,res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({ error : 'url is required'})
    const shortid = shortidd();    
    await URL.create({
        shortid : shortid,
        redirectURL : body.url,
        visithis : []
    })
    return res.json({ id: shortid})
}

module.exports = 
{
    generateShortUrl,
};