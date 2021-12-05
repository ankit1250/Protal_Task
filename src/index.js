const express = require('express')
const User = require('./models/user')
require('./db/mongoose')

const app = express()
const port = process.env.port|3000

app.use(express.json())

//Read operation
app.get('/get_user/:id',async (req,res)=>{
    const _id = req.params.id
    try{
        const user = User.findById(_id)
        if(!user){
            res.status(400).send("Can't find the requested user.")
        }
        res.send(user)
    }catch(e){
       res.status(500).send(e)
    }
})

app.post('/register',async (req,res)=>{
    const user = new User(req.body)
    try{
        if(!user){
            return res.send('Invalid data for registration')
        }
        await user.save()
        res.send(user)
    }catch(e){
       res.send(e)
    }
})

app.post('/login', async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.username,req.body.password)
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

app.patch('/update/:id', async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send("Error: Invalid update")
    }

    try{
        const user = await User.findById(req.params.id)

        updates.forEach((update)=> user[update]= req.body[update])

        await user.save()
        //const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!user){
            return res.status(404).send("User update failed")
        }
        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

app.delete('/delete/:id',async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(400).send("There is no user with the requested id")
        }
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

app.listen(port,()=>{
    console.log("Server is up on the port",port)
})