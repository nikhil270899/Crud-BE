const mongoose = require('mongoose')

let booksStructure  = {
    bookName:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    outOfStock:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now()
    }
}
let BooksSchema = new mongoose.Schema(booksStructure)

module.exports = mongoose.model('Books',BooksSchema)

