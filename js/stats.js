

if(document.querySelector('#app')){
    function tasks(){
        
        if(localStorage.length > 1){
            sortStorage();

            //creation de la page
            var app = document.getElementById('app')
            app.style.cssText="display:flex; flex-direction: column ;"

            let statContainer = document.createElement('div')
            let statButton = document.createElement('button') 

            app.appendChild(statContainer).appendChild(statButton)

            statContainer.setAttribute('class', 'container-top')
            statButton.setAttribute('class', 'button-redirect')

            statButton.textContent = "Statistique"

            statButton.onclick = function(){
                window.location.href = '/stat.html'
            }
        
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
            supprButton.setAttribute('id', `delete${i}`);
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
            fixLocalStorage(supprButton, i)
        } 
        }
        addElement();        
    }
    
    function addElement(){
        
    //Create element sur tasks, ajout après click sur boutton '+'
    
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
        let tagsContainer = document.createElement('div')
        let addTags = document.createElement('button')
        let buttonContainer = document.createElement('div')
        let modalSave = document.createElement('button')
        let modalClose = document.createElement('button')
        let path = app.appendChild(modal).appendChild(modalForm)
    
        //Modal append child
        path.appendChild(labelText)
        path.appendChild(inputText)
        path.appendChild(labelTags)
        path.appendChild(tagsDiv).appendChild(tagsContainer).appendChild(addTags)
        path.appendChild(buttonContainer).appendChild(modalSave)
        path.appendChild(buttonContainer).appendChild(modalClose)
    
        //modal attribute
        tagsDiv.setAttribute('id', 'tags-length')
        modal.setAttribute('class', 'modal')
        inputText.setAttribute('id', 'add-title')
        addTags.setAttribute('id', 'add-tags')
        addTags.setAttribute('class', 'button-tasks')
        modalForm.setAttribute('class', 'modal-content')
        tagsContainer.setAttribute('id', "tags-container")
        buttonContainer.setAttribute('class', 'button-container')
        modalSave.setAttribute('id', 'modal-save')
        modalClose.setAttribute('id', 'modal-close')
    
        labelText.textContent = "Titre"
        labelTags.textContent = "Tags"
        addTags.textContent = "+"
        modalSave.textContent = "Enregistrer"
        modalClose.textContent = "Fermer"
        
        //Boutton ouverture du modal
        addButton.onclick = function(event){
            event.preventDefault();
            modal.style.display ="block"
        }

        //Boutton Fermer le modal
        modalClose.onclick = function(event){
            event.preventDefault();
            modal.style.display ='none'
        }
        appendInput(addTags);
        addToLocalStorage()
    }

    //Ajout d'un tag après click sur le bouton "+" dans le modal

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
    
    //Sauvegarder dans le local storage
    function addToLocalStorage(){
    
        const today = new Date().toLocaleDateString()
        const getLocalLength = localStorage.length - 1
        const localNewId = localStorage.length
        let localParse = JSON.parse(localStorage.getItem(`data${getLocalLength}`))
        let tags = document.getElementsByClassName('tags-length');
        let title = document.getElementById('add-title')
        let save = document.getElementById('modal-save')
        
        //boutton sauvegarder dans le modal
        save.onclick = function(event){
            event.preventDefault();

            //si lS.l > 1, créer un nouvel id pour l'élément en fonction 
            // du plus haut ID dans le localStorage
            if(localStorage.length > 1){
                const newId = localParse.id + 1
                 

            for (let i = 0; i <= tags.length; i++){
                i = 1

                // si l'input titre est rempli et le nmbr d'input tag est à zéro => sauvegarder

                if(title.value && tags.length < 1){
                    localStorage.setItem(`data${localNewId}`, `{"id": ${newId},
                    "text": "${title.value}",
                    "created_at": "${today}",
                    "Tags": [""],
                    "is_complete": false}`)
                        
                    window.location.href = "tasks.html"
                }
                //autrement input titre rempli et tags au dela de zéro => Faire "soit":
                else if(title.value && tags.length > 0){
                    // ajouter les données des input tag dans un tableau 
                    let array = []
                    for (let j = 1; j <= tags.length; j++){
                        var element = document.getElementById(`tag${j}`)
                        array.push(element.value)                                               
                    }
                    
                    //si input des tags n'est pas rempli => alert
                    if(element.value === ""){
                        alert ('Veuillez ajouter les Tags')
                        break;
                    }
                    // si tag et input sont rempli => sauvegarder
                       else{
                        let arrayStringify = JSON.stringify(array)
                        localStorage.setItem(`data${localNewId}`, `{"id": ${newId},
                        "text": "${title.value}",
                        "created_at": "${today}",
                        "Tags": ${arrayStringify},
                        "is_complete": false}`)
                        window.location.href = "tasks.html" 
                        
                        break;
                    }
                        
                }
                //si titre input non rempli => alert
                else{
                    alert('Veuillez ajouter un titre')
                    break;
                }  
                        
            }  
        }
        //si lS.l = 1
        else{
            for (let i = 0; i <= tags.length; i++){
                i = 1
                if(title.value !== "" && tags.length < 1){
                        localStorage.setItem(`data${localNewId}`, `{"id": ${localStorage.length},
                        "text": "${title.value}",
                        "created_at": "${today}",
                        "Tags": [""],
                        "is_complete": false}`)
                     
                    
                    window.location.href = "tasks.html"
                    
                }
                else if(title.value && tags.length > 0){
                    let array = [];
                    for (let j = 1; j <= tags.length; j++){
                        var element = document.getElementById(`tag${j}`)
                        array.push(element.value)                                               
                    }
    
                    if(element.value === ""){
                        alert ('Veuillez ajouter les Tags')
                        break;
                    }
    
                       else{
                        let arrayStringify = JSON.stringify(array)
                        localStorage.setItem(`data${localNewId}`, `{"id": ${localStorage.length},
                        "text": "${title.value}",
                        "created_at": "${today}",
                        "Tags": ${arrayStringify},
                        "is_complete": false}`)
                        window.location.href = "tasks.html"  
                        break;
                    }
                        
                }
                else{
                    alert('Veuillez ajouter un titre')
                    break;
                } 
                        
            } 
        }
    }
        
    }
    
    //Rearrange le local storage après une suppression

    function fixLocalStorage(supprButton, i){       
        supprButton.onclick = function(){
    
            window.location.href = "tasks.html"
            localStorage.removeItem(`data${i}`)
            for (let j = 1; j < localStorage.length; j++){
            let localJson = localStorage.getItem('data' + j)
            let parse = JSON.parse(localJson)
            
                                
            if (parse === null){
                                    
                let oldKey = j + 1
                localStorage.setItem("data" + j, localStorage.getItem("data" + oldKey))
                localStorage.removeItem("data" + oldKey)          
                }   
            }                                  
        }
    }

    //Sort le local storage avec les is_complete : true en Asc
    function sortStorage(){

        const array = []
        for (let i = 1; i < localStorage.length; i++){
            let getData = localStorage.getItem("data" + i)
            let parse = JSON.parse(getData)
            array.push(parse)
        }

        const trueFirst = array.sort((a, b) => b.is_complete - a.is_complete);
        for (let j = 1; j < localStorage.length; j++){
            let newJ = j - 1
            let trueData = JSON.stringify(trueFirst[newJ])
            
            localStorage.setItem('data'+ j, trueData)
        }        
    }         
    tasks();   
}
else{

    function stat(){
        let stat = document.getElementById('appStat')
        let exitDiv = document.createElement('div')
        let exitbutton = document.createElement('button')
        let div = document.createElement('div')
        let tacheTotal = document.createElement('h1')
        let tacheTrue = document.createElement('h2')
        let tacheFalse = document.createElement('h2')
        
        stat.appendChild(div).appendChild(tacheTotal)
        stat.appendChild(div).appendChild(tacheTrue)
        stat.appendChild(div).appendChild(tacheFalse)
        stat.appendChild(exitDiv).appendChild(exitbutton)
        
        const array =[]
        for (let i = 1; i < localStorage.length; i++){

            var data = JSON.parse(localStorage.getItem('data' + i)) 
            array.push(data) 
        }
        let counterTrue = 0
        array.forEach(v => v.is_complete ? counterTrue++ : v);
        
        if(counterTrue < array.length / 2){
           var counterFalse = array.length - counterTrue
            
        }
        else{
            counterFalse = array.length - counterTrue
        }

        div.style.cssText = "display:flex; justify-content:center; align-items:center; flex-direction:column;"
        tacheTotal.style.cssText ="padding: 1rem"
        tacheTrue.style.cssText ='padding:1rem 0'
        tacheFalse.style.cssText ='padding:1rem 0'

        exitDiv.setAttribute('class', 'container-top')
        exitbutton.setAttribute('class', 'button-redirect')
        exitbutton.textContent = "Retour"
        tacheTotal.textContent = `Tâche(s) totale(s): ${array.length}`
        tacheTrue.textContent = `Tâche(s) terminée(s): ${counterTrue}`
        tacheFalse.textContent = `Tâche(s) à faire : ${counterFalse}`

        exitbutton.onclick = function(){
            window.location.href = '/tasks.html'
        }
    }
    stat();
}



