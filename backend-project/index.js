const express = require("express")
const app = express()
const path = require("path");
const userModel = require("./models/userModel")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set("view engine", "ejs")

app.get("/", (req,res)=>{
    res.render("userform.ejs")
})


app.get("/read", async (req,res)=>{
    let data = await userModel.find()
    res.render("usersProfile.ejs", {data})
})
app.post("/create", async(req,res)=>{
    let result =  req.body
    let addUser = await userModel.create(result)
    res.redirect("/read")
})

app.post("/update/:userid", async(req,res)=>{
    let id = req.params.userid
    let {name, email, image} = req.body
    let edituser = await userModel.findOneAndUpdate({_id: id},{name, email, image}, {new: true})
    res.redirect("/read")
})


app.get("/edit/:userid", async (req,res)=>{
    let id = req.params.userid
    let user = await userModel.findOne({_id: id})
    console.log("user is: ", user)
    res.render("editProfile.ejs", {user})
})

app.get("/delete/:userid", async(req,res)=>{
    let id = req.params.userid
    console.log(id)
    let deleteUser = await userModel.findOneAndDelete({_id: req.params.userid})
    res.redirect("/read")

})

app.listen(2000, ()=>{
    console.log("server is connected to the port 2000")
})