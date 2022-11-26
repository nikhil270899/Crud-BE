const express = require('express');
const Books = require('../models/books');

const router = express.Router()


//get - READ
router.get('/', async (req,res)=>{
    try {
        let booksList = await Books.find()
        res.json(booksList)
    } 
    catch (error) {
        res.json({message:err,status:res.status})

    }
})
//get by id
router.get('/:id', async (req,res)=>{
    try {
        let book = await Books.findById(req.params.id)
        res.json(book)
    } 
    catch (error) {
        res.json({message:err,status:res.status})

    }
})
//post - CREATE
router.post('/', async (req,res) =>{
    let clientReq = new Books({
        bookName : req.body.bookName,
        author : req.body.author,
        outOfStock : req.body.outOfStock,
    })
    try {
    let fetchedBooksListFromDb = await Books.find()

    let sendBooksList = await clientReq.save()
    let isBookAdded = fetchedBooksListFromDb.map(book => book.bookName).includes(sendBooksList.bookName)
    if(isBookAdded) return res.status(400).json({message: "Book Already Exists"})
    res.json(sendBooksList)
    } 
    catch (error) {
        let readableErrorMessage = ''
        for(let field in error.errors){
            if(field) readableErrorMessage += field + ''
        }
        readableErrorMessage = `Missing fields ${readableErrorMessage}`
        let errorMessage = {
            message: readableErrorMessage,
        }
        res.json(errorMessage)
    }
})
//update - UPDATE
router.put('/:id', async (req,res) =>{
    try {
    let book = await Books.findById(req.params.id)
        book.bookName = req.body.bookName,
        book.author = req.body.author,
        book.outOfStock = req.body.outOfStock
    let sendUpdatedBooksList = await book.save()
    res.json(sendUpdatedBooksList)
    } 
    catch (error) {
        let errorMessage = {
            message: error,
            status: res.status
        }
        res.json(errorMessage)
    }
})

//delete
router.delete('/:id', async (req,res)=>{
    try {
        let fetchedBooksListFromDb = await Books.find()

       let book = await Books.findById(req.params.id)

        if(!fetchedBooksListFromDb.map(book => book.bookName).includes(book.bookName)) return res.status(400).send({message:"Book Doesn't exist"})
        let deletedBook = await book.remove()
        res.status(200).json({message:`book with ${req.params.id} got deleted`})
    } 
    catch (error) {
        res.json({message:"Book doesn't exists",status:res.status})

    }
})
module.exports = router

