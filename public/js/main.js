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
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteItem', {
            method: 'delete',
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
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('markComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
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
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('markUnComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
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