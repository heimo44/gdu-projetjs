function data(){ 

    //Params
    let inputUrl = new URL('http://127.0.0.1:5500/item.html');
    let inputParams = new URLSearchParams(inputUrl.search);
    inputParams.append(window.location.search, window.location.search);

    //DISPLAY TITLE
    //Get id with search param
    let replace = window.location.search.replace('?', '')
    let localItem = localStorage.getItem("data" + replace)
    let parseItem = JSON.parse(localItem)
    

    //Get id title
    let title = document.getElementById('title');
    title.innerText = parseItem.text;

    //DISPLAY CONTENT
    //Get id
    let app = document.getElementById('app');

    //Create elements
    let appParent = document.createElement('div')
    let container = document.createElement('div')
    let appParagraphe = document.createElement('p')
    let appSpan = document.createElement('span')
    let divButton = document.createElement('div')
    let appButton = document.createElement('button')  
    let deleteButton = document.createElement('button')
    let divExit = document.createElement('div')
    let exitButton  =  document.createElement('button')

    let parent = app.appendChild(appParent)
    parent.appendChild(container).appendChild(appParagraphe)
    parent.appendChild(container).appendChild(appSpan)
    parent.appendChild(divButton).appendChild(appButton)
    parent.appendChild(divButton).appendChild(deleteButton)
    parent.appendChild(divExit).appendChild(exitButton)

    

    //Set attribute
    container.setAttribute('class', 'container-item')
    divButton.setAttribute('class', 'button-container')
    appButton.setAttribute('id', 'itemButton');
    deleteButton.setAttribute('class', 'delete-button')
    divExit.setAttribute('class', 'container-redirect')
    exitButton.setAttribute('class', 'button-redirect')

    deleteButton.textContent = 'X'
    exitButton.textContent = 'Retour'
    let tags = [];

    //Element text
    appParagraphe.textContent = `Crée le ${parseItem.created_at}`
    for (let i = 0; i < parseItem.Tags.length; i++){
        tags.push(parseItem.Tags[i])
    }

    appSpan.textContent = `Tags : ${tags.toString().replace(',' , ', ')}`

    if (parseItem.is_complete){
        appButton.textContent = "Terminé"
        appButton.style.cssText='background-color:#1abc9c'
    }
    else if (parseItem.is_complete !== true){
        appButton.textContent = "À faire"
        appButton.style.cssText='background-color:#bc3a1a'
    }  

    exitButton.onclick = function(event){
        event.preventDefault();
        window.location.href = '/tasks.html'
    }
    deleteItem(deleteButton, replace);
    updateStatus(parseItem, tags, replace);
}

function updateStatus(parseItem, tags, replace){

    let updateButton = document.getElementById('itemButton')
    updateButton.onclick = function(){

        let jsonTag = JSON.stringify(tags)

        if (parseItem.is_complete){
            localStorage.setItem("data" + replace, `{"id": ${parseItem.id},
            "text": "${parseItem.text}",
            "created_at": "${parseItem.created_at}",
            "Tags": ${jsonTag},
            "is_complete": false}`)
            window.location.href ="item.html?" + replace
}
        else{
            localStorage.setItem("data" + replace, `{"id": ${parseItem.id},
            "text": "${parseItem.text}",
            "created_at": "${parseItem.created_at}",
            "Tags": ${jsonTag},
            "is_complete": true}`)
            window.location.href ="tasks.html"
        }
        
    }
}

function deleteItem(deleteButton, replace){
    deleteButton.onclick = function(){
        localStorage.removeItem('data' + replace);
        
        for (let i = 1; i < localStorage.length; i++){
               let localJson = localStorage.getItem('data' + i)
               let parse = JSON.parse(localJson)
               
           if (parse === null){
                   
                   let oldKey = i + 1
                   localStorage.setItem("data" + i, localStorage.getItem("data" + oldKey))
                   localStorage.removeItem("data" + oldKey)          
       }          
   } 
   window.location.href = "tasks.html";
    }
}
data();