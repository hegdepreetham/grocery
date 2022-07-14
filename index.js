// ****** SELECT ITEMS **********
const alert=document.querySelector(".alert")
const form=document.querySelector(".grocery-form")
const grocery=document.getElementById("grocery")
const submit=document.querySelector(".submit-btn")
const container=document.querySelector(".grocery-container")
const list=document.querySelector(".grocery-list")
const clearbtn=document.querySelector(".clear-btn")

// edit option
let editElement;
let editFlag=false
let editId=''

// ****** EVENT LISTENERS **********
// submit form
form.addEventListener("submit",addItem)
// clear btn
clearbtn.addEventListener("click",clearItems)
// load items
window.addEventListener("DOMContentLoaded",setupItems)

// ****** FUNCTIONS **********
function addItem(e){
    e.preventDefault();
     const value=grocery.value;
     const id=new Date().getTime().toString();
     if(value && !editFlag){
       createListItems(id,value);
       displayAlert("item added to the list","success")
       container.classList.add("show-container")
       // add to localStorage
       addToLocalStorage(id,value)
       setBacktoDefault()
     }
     else if(value && editFlag){
        editItem.innerHTML=value
        displayAlert("Value changed","success")
        editLocalStorage(editId,value)
        setBacktoDefault()
     }
     else{
      displayAlert("Please Enter value","danger")
     }
}
// display alert
function displayAlert(text,action){
    alert.textContent=text
    alert.classList.add(`alert-${action}`)
    // remove alert
    setTimeout(function(){
        alert.textContent=''
        alert.classList.remove(`alert-${action}`) 
    },2000)
}
// clear items
function clearItems(){
    const items=document.querySelectorAll(".grocery-item")
    if(items.length){
        items.forEach(function(item){
            list.removeChild(item);
        })
        container.classList.remove("show-container")
        displayAlert("All items removed","success")
        setBacktoDefault()
         localStorage.removeItem('list')
    }
}
// delete function
function deleteItem(e){
   const element=e.currentTarget.parentElement.parentElement;
   const id=element.dataset.id;
   list.removeChild(element)
   if(list.children.length===0){
    container.classList.remove("show-container")
   }
   displayAlert("item removed",'success')
//    remove from local storage
    removeFromLocalStorage(id);
    setBacktoDefault()
}
// edit item
function editItem(e){
    const element=e.currentTarget.parentElement.parentElement;
    // set edit item
    editItem=e.currentTarget.parentElement.previousElementSibling;
    console.log(editItem);
    // set form value
    grocery.value=editItem.innerHTML
    editFlag=true
    editId=element.dataset.id;
    submit.textContent="edit"
}
// set back to default
function setBacktoDefault(){
   grocery.value=''
   editFlag=false
   editId=""
   submit.textContent="submit"
}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id,value){
    const grocery={id,value}
    console.log(grocery);
    let localItems=getLocalStorage();
    localItems.push(grocery)
     localStorage.setItem("list",JSON.stringify(localItems))
}
function removeFromLocalStorage(id){
    let items=getLocalStorage();
    items=items.filter(function(item){
        if(item.id!==id){
            return item;
        }
    })
    console.log(items);
    localStorage.setItem("list",JSON.stringify(items))
}
function editLocalStorage(id,value){
    let items=getLocalStorage()
    items-items.map(function(item){
        if(item.id===id){
            item.value=value
        }
        return item
    })
    localStorage.setItem("list",JSON.stringify(items))
}
function getLocalStorage(){
    return localStorage.getItem("list")?JSON.parse(localStorage.getItem("list")):[];
}
// ****** SETUP ITEMS **********
function setupItems(){
    let items=getLocalStorage();
    if(items.length>0){
        items.forEach(function(item){
                createListItems(item.id,item.value)
        })
        container.classList.add("show-container")
    }
}
function createListItems(id,value){
    const element=document.createElement("article")
    element.classList.add("grocery-item")
    const attr=document.createAttribute("data-id")
    attr.value=id;
    element.setAttributeNode(attr)
    element.innerHTML=`  
     <p class="item">${value}</p>
    <div class="btn-container">
      <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
      <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>`
    const deleteBtn=element.querySelector(".delete-btn")
    deleteBtn.addEventListener("click",deleteItem);
    const editBtn=element.querySelector(".edit-btn")
    editBtn.addEventListener("click",editItem);
    // append child
    list.appendChild(element)
   
}