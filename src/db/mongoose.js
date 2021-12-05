const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Protal_Task',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
