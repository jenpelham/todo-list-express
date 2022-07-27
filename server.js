//use express framework
const express = require('express')
//put express in app
const app = express()
//use mongo for database
const MongoClient = require('mongodb').MongoClient
//use port 2121
const PORT = 2121
//npm package that loads environment variables
require('dotenv').config()

//database info
let db,
    //connect to database with this string
    dbConnectionStr = process.env.DB_STRING,
    //database name
    dbName = 'todo'
//connect to mongo database
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    //when connected
    .then(client => {
        //print this string to console
        console.log(`Connected to ${dbName} Database`)
        //overwrite db variable
        db = client.db(dbName)
    })
    
//use ejs to display
app.set('view engine', 'ejs')
//set view to public
app.use(express.static('public'))
//middleware to recognize the incoming Request Object as strings or arrays
app.use(express.urlencoded({ extended: true }))
//middleware that parses incoming JSON requests and puts the parsed data in req
app.use(express.json())

//make request and get response
app.get('/',async (request, response)=>{
    //items that still need to be done
    const todoItems = await db.collection('todos').find().toArray()
    //number of items left
    const itemsLeft = await db.collection('todos').countDocuments({completed: false})
    //show to do items that still need to be done and number of items left
    response.render('index.ejs', { items: todoItems, left: itemsLeft })

    //previously commented code
    // db.collection('todos').find().toArray()
    // .then(data => {
    //     db.collection('todos').countDocuments({completed: false})
    //     .then(itemsLeft => {
    //         response.render('index.ejs', { items: data, left: itemsLeft })
    //     })
    // })
    // .catch(error => console.error(error))
})

//add a new item to the to do list server
app.post('/addTodo', (request, response) => {
    //insert one item to todos collection
    db.collection('todos').insertOne({thing: request.body.todoItem, completed: false})
    //when finished
    .then(result => {
        //print string to console
        console.log('Todo Added')
        //then redirect user
        response.redirect('/')
    })
    //if there's an error, print error to console
    .catch(error => console.error(error))
})

//mark task as completed in the to do list server
app.put('/markComplete', (request, response) => {
    //update a task in todos collection
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
        //mark task
        $set: {
            //completed
            completed: true
          }
    },{
        //sort list, move completed item
        sort: {_id: -1},
        //if item marked as complete isn't true, use false
        upsert: false
    })
    //after setting
    .then(result => {
        //print string to console
        console.log('Marked Complete')
        //display string in browser
        response.json('Marked Complete')
    })
    //if there's an error, print error to console
    .catch(error => console.error(error))

})

//mark task as uncompleted in the to do list server
app.put('/markUnComplete', (request, response) => {
    //update a task in todos collection
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
        //set task as incomplete
        $set: {
            //complete = false
            completed: false
          }
    },{
        //sort list, move incompleted item
        sort: {_id: -1},
        //if item marked as complete isn't false, use false
        upsert: false
    })
    //when finished
    .then(result => {
        //print string to console
        console.log('Marked Complete')
        //show string in browser
        response.json('Marked Complete')
    })
    //if there's an error, print error to console
    .catch(error => console.error(error))  

})
//delete a task from the to do list server
app.delete('/deleteItem', (request, response) => {
    //delete item from todos collection
    db.collection('todos').deleteOne({thing: request.body.itemFromJS})
    //when finished
    .then(result => {
        //print string to console
        console.log('Todo Deleted')
        //show string in browser
        response.json('Todo Deleted')
    })
    //if there's an error, print error to console
    .catch(error => console.error(error))

})
//test to make sure server is running
app.listen(process.env.PORT || PORT, ()=>{
    //print string to console
    console.log(`Server running on port ${PORT}`)
})