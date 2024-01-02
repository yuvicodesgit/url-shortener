const express = require("express");
const urlroute = require("./routes/url")
const {connect} = require("./connectdb")
const URL = require("./models/url")
const app = express();
connect("mongodb://localhost:27017/short-url").then(()=>{
    console.log("Database is Connected");
})

app.use(express.json())
app.use("/url", urlroute)

app.get("/:shortid",async(req,res)=>{
  const shortid = req.params.shortid;
  const entry =  await URL.findOneAndUpdate({
        shortid
    },{$push:{
        visithis :{
            timestamp : Date.now(),
        }
    }})

    res.redirect(entry.redirectURL);

})

app.listen('8000',()=>{
    console.log("Server Started at Port 8000");
})