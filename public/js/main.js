const deleteBtn = document.querySelectorAll('.fa-trash') //create variable and assigning to selection of all elements with class of trash can
const item = document.querySelectorAll('.item span') //create variable and assigning to selection of all span tags inside parent with class of 'item'
const itemCompleted = document.querySelectorAll('.item span.completed') //create variable and assigning to selection of all span tags with class of 'completed' inside parent with class of 'item'

Array.from(deleteBtn).forEach((element)=>{ //create array from selection and start loop
    element.addEventListener('click', deleteItem) //add event listener to current item that waits for a click and calls deleteItem function
}) //close loop

Array.from(item).forEach((element)=>{ //create array from selection and start loop
    element.addEventListener('click', markComplete) //add event listener to current item that waits for a click and calls markComplete function
}) //close loop

Array.from(itemCompleted).forEach((element)=>{ //create array from selection and start loop
    element.addEventListener('click', markUnComplete) //add event listener to completed item that waits for a click and calls markUnComplete function
}) //close loop

async function deleteItem(){ //declare asynchronous function
    const itemText = this.parentNode.childNodes[1].innerText //looks inside list item and grabs only inner text within list span
    try{ //start a try block to do something
        const response = await fetch('deleteItem', { //create response variable that waits on fetch to get data from result of 'deleteItem' route
            method: 'delete', //set CRUD method to 'delete' for route
            headers: {'Content-Type': 'application/json'}, //specifying type of content expected, which is JSON
            body: JSON.stringify({ //declare message content being passed and turn it into a string
              'itemFromJS': itemText //set content of body to inner text of list item and naming it 'itemFromJS'
            }) //close body
          }) //close object
        const data = await response.json() //waiting on json from response to be converted
        console.log(data) //print data to console
        location.reload() //reload page to update what is displayed

    }catch(err){ //if there's an error, pass error to catch block
        console.log(err) //print error to console
    } //close catch block
} //close function

async function markComplete(){ //declare asynchronous function
    const itemText = this.parentNode.childNodes[1].innerText //looks inside list item and grabs only inner text within list span
    try{ //start a try block to do something
        const response = await fetch('markComplete', { //create response variable that waits on fetch to get data from result of 'markComplete' route
            method: 'put', //set CRUD method to 'update' for route
            headers: {'Content-Type': 'application/json'}, //specifying type of content expected, which is JSON
            body: JSON.stringify({ //declare message content being passed and turn it into a string
                'itemFromJS': itemText //set content of body to inner text of list item and naming it 'itemFromJS'
            }) //close body
          }) //close object
        const data = await response.json() //waiting on json from response to be converted
        console.log(data) //print data to console
        location.reload() //reload page to update what is displayed

    }catch(err){ //if there's an error, pass error to catch block
        console.log(err) //print error to console
    } //close catch block
} //close function

async function markUnComplete(){ //declare asynchronous function
    const itemText = this.parentNode.childNodes[1].innerText //looks inside list item and grabs only inner text within list span
    try{ //start a try block to do something
        const response = await fetch('markUnComplete', { //create response variable that waits on fetch to get data from result of 'markUnComplete' route
            method: 'put', //set CRUD method to 'update' for route
            headers: {'Content-Type': 'application/json'}, //specifying type of content expected, which is JSON
            body: JSON.stringify({ //declare message content being passed and turn it into a string
                'itemFromJS': itemText //set content of body to inner text of list item and naming it 'itemFromJS'
            }) //close body
          }) //close object
        const data = await response.json() //waiting on json from response to be converted
        console.log(data) //print data to console
        location.reload() //reload page

    }catch(err){ //if there's an error, pass error to catch block
        console.log(err) //print error to console
    } //close catch block
} //close function