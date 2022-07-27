//delete button
const deleteBtn = document.querySelectorAll('.fa-trash')
//select an item with child of span
const item = document.querySelectorAll('.item span')
//select a completed item with child of span and completed
const itemCompleted = document.querySelectorAll('.item span.completed')

//select item from array deleteBtn
Array.from(deleteBtn).forEach((element)=>{
    //run function deleteItem when delete button is clicked
    element.addEventListener('click', deleteItem)
})
//select item from array item
Array.from(item).forEach((element)=>{
    //run function markComplete when item is clicked
    element.addEventListener('click', markComplete)
})
//select item from array itemCompleted
Array.from(itemCompleted).forEach((element)=>{
    //run function markUnComplete when item is clicked
    element.addEventListener('click', markUnComplete)
})

//delete item function
async function deleteItem(){
    //selected task item
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        //respond with fetch deleteItem
        const response = await fetch('deleteItem', {
            //use delete method
            method: 'delete',
            //use this header
            headers: {'Content-Type': 'application/json'},
            //turn input into string
            body: JSON.stringify({
                //text from user
              'itemFromJS': itemText
            })
          })
        const data = await response.json()
        //print data to console
        console.log(data)
        //reload page
        location.reload()
    //if there's an error,
    }catch(err){
        //print error to console
        console.log(err)
    }
}
//mark task as completed
async function markComplete(){
    //selected task item
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        //respond with fetch markComplete
        const response = await fetch('markComplete', {
            //use put method
            method: 'put',
            //use this header
            headers: {'Content-Type': 'application/json'},
            //turn input into string
            body: JSON.stringify({
                //text from user
                'itemFromJS': itemText
            })
          })
        const data = await response.json()
        //print data to console
        console.log(data)
        //reload page
        location.reload()
    //if there's an error,
    }catch(err){
        //print error to console
        console.log(err)
    }
}
//mark task as uncompleted
async function markUnComplete(){
    //selected task item
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        //respond with fetch markUnComplete
        const response = await fetch('markUnComplete', {
            //use put method
            method: 'put',
            //use this header
            headers: {'Content-Type': 'application/json'},
            //turn input into string
            body: JSON.stringify({
                //text from user
                'itemFromJS': itemText
            })
          })
        const data = await response.json()
        //print data to console
        console.log(data)
        //reload page
        location.reload()
    //if there's an error,
    }catch(err){
        //print error to console
        console.log(err)
    }
}