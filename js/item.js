

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
    let appParagraphe = document.createElement('p')
    let appSpan = document.createElement('span')
    let parent = app.appendChild(appParent)

    let appButton = document.createElement('button')  
    let deleteButton = document.createElement('button')  
    
    parent.appendChild(appSpan)
    parent.appendChild(appParagraphe)
    parent.appendChild(appButton)
    parent.appendChild(deleteButton)
    

    //Set attribute
    appButton.setAttribute('id', 'itemButton');
    deleteButton.setAttribute('class', 'button-tasks delete-button')
    deleteButton.textContent = ('X')
    let tags = [];

    //Element text
    appParagraphe.innerText = parseItem.created_at
    for (let i = 0; i < parseItem.Tags.length; i++){
        tags.push(parseItem.Tags[i])
    }

    appSpan.textContent = tags.toString().replace(',' , ', ')
    
    if (parseItem.is_complete){
        appButton.textContent = "Terminé"
        appButton.style.cssText='background-color:#1abc9c'
    }
    else if (parseItem.is_complete !== true){
        appButton.textContent = "À faire"
        appButton.style.cssText='background-color:#bc3a1a'
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
}
        else{
            localStorage.setItem("data" + replace, `{"id": ${parseItem.id},
            "text": "${parseItem.text}",
            "created_at": "${parseItem.created_at}",
            "Tags": ${jsonTag},
            "is_complete": true}`)
        }
        window.location.href ="item.html?" + replace
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