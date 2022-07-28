const express = require('express') //make it possible to use express in this file
const app = express() //create variable and assigning it to instance of express
const MongoClient = require('mongodb').MongoClient //makes it possible to use methods associated with MongoClient and talk to our db
const PORT = 2121 //create variable to say where server will be listening
require('dotenv').config() //make it possible to look for variables in .env file


let db, //create variable
    dbConnectionStr = process.env.DB_STRING,//create variable and assign db connection string
    dbName = 'todo' //create variable and assign database name

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }) //create connection to mongoDB. Passing in connection string and additional property
    .then(client => { //wait for connection and proceed if successful. Pass in client info
        console.log(`Connected to ${dbName} Database`) //print string to console
        db = client.db(dbName) //reassign db variable that contains db client factory method
    }) //close .then

//middleware
app.set('view engine', 'ejs') //use ejs as default render
app.use(express.static('public')) //set location for static assets
app.use(express.urlencoded({ extended: true })) //tells express to decode and encode URLs where the header matches the content. Supports arrays and objects
app.use(express.json()) //parses incoming JSON requests and puts the parsed data in req


app.get('/',async (request, response)=>{ //starts a get method when root route is passed in, sets up req and res parameters
    const todoItems = await db.collection('todos').find().toArray() //create variable and awaits all items from the todos collection
    const itemsLeft = await db.collection('todos').countDocuments({completed: false}) //create variable and awaits count of incomplete items to later display in ejs
    response.render('index.ejs', { items: todoItems, left: itemsLeft }) //render ejs to show to do items that still need to be done and number of items left

    //previously commented code
    // db.collection('todos').find().toArray()
    // .then(data => {
    //     db.collection('todos').countDocuments({completed: false})
    //     .then(itemsLeft => {
    //         response.render('index.ejs', { items: data, left: itemsLeft })
    //     })
    // })
    // .catch(error => console.error(error))
}) //close get method

app.post('/addTodo', (request, response) => {//starts a get method when addTodo route is passed in, sets up req and res parameters
    db.collection('todos').insertOne({thing: request.body.todoItem, completed: false})//insert one new task into todos collection
    .then(result => { //if insert is successful, do something
        console.log('Todo Added') //print string to console
        response.redirect('/') //gets rid of addTodo route and then redirect user to homepage
    }) //close then block
    .catch(error => console.error(error)) //if there's an error, print error to console
}) //close post method

app.put('/markComplete', (request, response) => { //starts a put method when markComplete route is passed in, sets up req and res parameters
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{ //look in db for item matching name of item passed in from main.js
        $set: { //open set
            completed: true //set completed status to true
          } //close set
    },{ //open object
        sort: {_id: -1}, //move item to bottom of list
        upsert: false //prevents insertion if item does not already exist
    }) //close object
    .then(result => { //start then if update was successful
        console.log('Marked Complete') //print string to console
        response.json('Marked Complete') //send response back to user in browser
    }) //close then block
    .catch(error => console.error(error)) //if there's an error, print error to console

}) //close put method

app.put('/markUnComplete', (request, response) => { //starts a put method when markUnComplete route is passed in, sets up req and res parameters
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{ //look in db for item matching name of item passed in from main.js
        $set: { //open set
            completed: false //set completed status to false
          } //close set
    },{ //open
        sort: {_id: -1}, //move item to bottom of list
        upsert: false //prevents insertion if item does not already exist
    }) //close
    .then(result => { //start then if update was successful
        console.log('Marked Complete') //print string to console
        response.json('Marked Complete') //send response back to user in browser
    }) //close then
    .catch(error => console.error(error)) //if there's an error, print error to console

})//close put method

app.delete('/deleteItem', (request, response) => { //starts a delete method when deleteItem route is passed in, sets up req and res parameters
    db.collection('todos').deleteOne({thing: request.body.itemFromJS}) //look in db for item matching name of item passed in from main.js
    .then(result => { //start then if delete was successful
        console.log('Todo Deleted') //print string to console
        response.json('Todo Deleted') //send response back to user in browser
    }) //close then block
    .catch(error => console.error(error)) //if there's an error, print error to console

}) //close put method

app.listen(process.env.PORT || PORT, ()=>{ //setting up which port we will be listening on: from .env file or port variable
    console.log(`Server running on port ${PORT}`) //print string to console
}) //close listen method