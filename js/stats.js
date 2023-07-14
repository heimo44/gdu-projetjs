
var app = document.getElementById('app')

function getItems(){

    app.style.cssText="display:flex; flex-direction: column"
    
    for (let i = 1; i < localStorage.length; i++){
        let localItem = localStorage.getItem("data" + i)
        let parseItem = JSON.parse(localItem)

    // Create elements div, p, button for app
        let p = document.createElement('p');
        let childCont = document.createElement('div');
        let div1 = document.createElement('div');
        let div2 = document.createElement('div');
        let button = document.createElement('button');
        let supprButton = document.createElement('button');

    //Append child
        app.appendChild(childCont).appendChild(div1).appendChild(p);
        app.appendChild(childCont).appendChild(div1).appendChild(button);
        app.appendChild(childCont).appendChild(div2).appendChild(supprButton);

    //Css properties on container       
        childCont.style.cssText ='display :flex; justify-content: space-between; width: 70vw';

 
    //Set attribute on elements
        childCont.setAttribute('id', `container${parseItem.id}`);
        div1.setAttribute('class', 'text-container');
        div2.setAttribute('class', 'delete-div');
        p.setAttribute('class', `text-item`);
        button.setAttribute('id', `button${parseItem.id}`);
        button.setAttribute('class', 'button-tasks');
        supprButton.setAttribute('id', `delete${parseItem.id}`);
        supprButton.setAttribute('class', 'button-tasks delete-button');

        if (parseItem.is_complete){
            div1.setAttribute('class', 'button-true items');
        }
        else if(parseItem.is_complete !== true){
            div1.setAttribute('class', 'button-false items');
        }

    //text
        p.textContent = parseItem.text;
        button.textContent = 'voir';
        supprButton.textContent = "X";

    //Fonction onclick
        button.onclick = function(event){
            event.preventDefault();
            window.location.href = `item.html?` + i
        }
    } 
    addElement();       
}

function addElement(){
    
//Create element

    //add button
    let appDiv = document.createElement('div')
    let appAdd = document.createElement('button')

    app.appendChild(appDiv)
    app.appendChild(appDiv).appendChild(appAdd)

    appAdd.textContent = '+'

//Set attribute
    appDiv.setAttribute('id', 'add-div')
    appAdd.setAttribute('class', 'button-tasks')
    appAdd.setAttribute('id', 'add-btn')

    modalBox();
}

function modalBox(){
    let addButton = document.getElementById('add-btn')
//modal
    let modal = document.createElement('div')
    let modalForm = document.createElement('form')
    let labelText = document.createElement('label')
    let tagsDiv = document.createElement('div')
    let labelTags = document.createElement('label')
    let inputText = document.createElement('input')
    let buttonContainer = document.createElement('div')
    let addTags = document.createElement('button')
    let buttonDiv = document.createElement('div')
    let modalSave = document.createElement('button')
    let modalClose = document.createElement('button')
    let path = app.appendChild(modal).appendChild(modalForm)

    //append child
    path.appendChild(labelText)
    path.appendChild(inputText)
    path.appendChild(inputText)
    path.appendChild(labelTags)
    path.appendChild(tagsDiv).appendChild(buttonContainer).appendChild(addTags)
    path.appendChild(buttonDiv).appendChild(modalSave)
    path.appendChild(buttonDiv).appendChild(modalClose)

    //modal attribute
    tagsDiv.setAttribute('id', 'tags-length')
    modal.setAttribute('class', 'modal')
    inputText.setAttribute('id', 'add-title')
    addTags.setAttribute('id', 'add-tags')
    buttonContainer.setAttribute('id', "button-container")
    modalForm.setAttribute('class', 'modal-content')
    addTags.setAttribute('class', 'button-tasks')
    modalSave.setAttribute('id', 'save')

    //modal close
    labelText.textContent = "Titre"
    labelTags.textContent = "Tags"
    addTags.textContent = "+"
    modalSave.textContent = "Enregistrer"
    modalClose.textContent = "Fermer"

    addButton.onclick = function(event){
        event.preventDefault();
        modal.style.display ="block"
    }
    modalClose.onclick = function(event){
        event.preventDefault();
        modal.style.display ='none'
    }
    appendInput(addTags);
    addToLocalStorage()
}
function appendInput(addTags){
    addTags.onclick = function(event){
        event.preventDefault();
        let inputAdd = document.createElement('input');
        inputAdd.setAttribute('class', 'tags-length')
        let tags = document.getElementsByClassName('tags-length');
        let containerTag = document.getElementById('tags-length');
        
        for (let i = 0; i <= tags.length; i++){
            containerTag.appendChild(inputAdd);
            inputAdd.setAttribute('id', `tag${i}`)
        }       
    }
}

function addToLocalStorage(){

    const today = new Date().toLocaleDateString()
    const getLocalLength = localStorage.length - 1
    const localNewId = localStorage.length
    const localParse = JSON.parse(localStorage.getItem(`data${getLocalLength}`))
    const newId = localParse.id + 1
    let tags = document.getElementsByClassName('tags-length');
    let title = document.getElementById('add-title')
    let save = document.getElementById('save')

    save.onclick = function(event){
        event.preventDefault();
        
            for (let i = 0; i <= tags.length; i++){
                i = 1

                if(title.value && tags.length < 1){
                    localStorage.setItem(`data${localNewId}`, `{"id": ${newId},
                    "text": "${title.value}",
                    "created_at": "${today}",
                    "Tags": [""],
                    "is_complete": false}`)
                    
                    window.location.href = "tasks.html"  
                }
                else if(title.value && tags.length > 0){
                    let array = []
                    for (let j = 1; j <= tags.length; j++){
                        let element = document.getElementById(`tag${j}`)
                        array.push(element.value)                       
                    }
                    let arrayStringify = JSON.stringify(array)
                    localStorage.setItem(`data${localNewId}`, `{"id": ${newId},
                    "text": "${title.value}",
                    "created_at": "${today}",
                    "Tags": ${arrayStringify},
                    "is_complete": false}`)
                    window.location.href = "tasks.html"  
                    break;
                } 
                else{
                    alert ('Veuillez remplir les champs');
                    break;
                }    
        }  
    }
    
}

function fixLocalStorage(){
    
    if (localStorage.length > 1){
        for (let i = 1; i < localStorage.length; i++){
            let localJson = localStorage.getItem('data' + i)
            let parse = JSON.parse(localJson)
            
            if (parse === null){
                
                let oldKey = i + 1
                localStorage.setItem("data" + i, localStorage.getItem("data" + oldKey))
                localStorage.removeItem("data" + oldKey)       
            }           
        }       
    }
}
getItems();
