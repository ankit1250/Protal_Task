const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    }
})

userSchema.statics.findByCredentials =async (username,password)=>{
    const user = await User.findOne({username})
    if(!user){
       throw new Error('Unable to login')
    }
    const isMatch = user.password == password
    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
}

const User = mongoose.model('User',userSchema)

module.exports = User