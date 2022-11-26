const express = require('express')
const mongoose = require('mongoose')


let url = "mongodb://localhost/BooksDb"

const app = express()
app.use(express.json())

// Below are from mongodb.com
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://nikhil2708:Saibaba@123@bookscluster.dcxquo4.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log(collection)
//   // perform actions on the collection object
//   client.close();
// });
mongoose.connect(url, { useNewUrlParser:true } , ()=>{
    console.log("DB CONNECTED")
})
// const connectDb = mongoose.connection
// connectDb.on('open', ()=>{
    //     console.log("Started Mongo rocks !")
    // })

const booksRouter = require('./routes/booksRoutes')
//middleware
//First the request comes here from client and by this middle ware we are transferring req to routes - > booksRoutes file
app.use('/books', booksRouter)


app.listen(9000,()=>{
    console.log("Server started");
})

