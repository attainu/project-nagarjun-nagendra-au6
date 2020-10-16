var mongoose = require('mongoose');
// mongodb connection

async function init() {
    try {
        await mongoose.connect('mongodb+srv://nagarjun9499:PYDM6WLoGLeP0sMA@cluster0.ly0uf.mongodb.net/chat-hub?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true});
        console.log('connected to mongodb');
    } catch (error) {
        console.log("error in mongodb connnection");
        console.log(error);
    }
}

init();