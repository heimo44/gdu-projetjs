
var app = document.getElementById('app')

function getData(){

           
            

getItems()
}

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
getData();

// function getStorage(){
  
//     // sessionStorage.setItem(localStorage.getItem("prenom"), localStorage.getItem(localStorage.key("prenom")))
    
//     for (let i = 1; i < localStorage.length; i++){
//         let localValue = localStorage.getItem("data" + i)
//         var parse = JSON.parse(localValue);
//         const array = []
//         array.push(parse)
//         getData(parse, localValue);  
//         console.log(array)
// }

// // addElement(parse)
// }

// //Display data
// function getData(parse){
    
         
//    

//     


//     

//     
  
    
//     //

//     deleteData(childCont, supprButton, parse)
    
// }

// //Delete data

// function deleteData(childCont, supprButton, parse){

// supprButton.onclick = function(event){
//     event.preventDefault();
    
    
//     //hide content
//     childCont.setAttribute('class', 'hide');

//     //add item to local storage with class hide
//     sessionStorage.setItem(`hide${parse.id}`, JSON.stringify(parse));
   
//     //delete from local storage
//     let getId = supprButton.id.replace('delete', '');
//     // localStorage.removeItem("data" + getId)

    

//     for (let i = 1; i < localStorage.length; i++){
//         let z = i
//         let y = "data" + i
        
//         let localValue = localStorage.getItem(y);
//         let parseDelete = JSON.parse(localValue);
//         let array = [parseDelete.id]
//         console.log(array)
//         if (localStorage.key(y) === null){
//             localStorage.removeItem(y)
//         }
//         localStorage.setItem(y, localValue)
        

        
//     }
    
//         // if (localStorage.length < u){
//         //     for (let i = 1 ; i < localStorage.length; i++){          
//         //     for (let item of localStorage.key(i)){
//         //         console.log(item)
//         //     }
//             // localStorage.setItem(i , localStorage.getItem(i, i.value))        
             
//         // }
        
//     // }
    
    
// }
// }



// // function addElement(parse){
// //  //Create element
// //  let appDiv = document.createElement('div')
// //  let appAdd = document.createElement('button')
// //  app.appendChild(appDiv)
// //  app.appendChild(appDiv).appendChild(appAdd)

// //  appAdd.textContent = '+'

// //  //Set attribute
// //  appDiv.setAttribute('id', 'add-div')
// //  appAdd.setAttribute('class', 'button-tasks')
// //  appAdd.setAttribute('id', 'btn')
// //  let getBtn = document.getElementById('btn')
 

// //      getBtn.onclick = function(event){
// //          event.preventDefault()
         
         
// //          let test = JSON.stringify({"id": 1,
// //          "text": "Learn about Polymer",
// //          "created_at": "Mon Apr 26 06:01:55 +0000 2015",
// //          "Tags": ["Web Development","Web Components"],
// //          "is_complete": true})
// //          let idn = localStorage.length += 1 - 1
// //          localStorage.setItem(idn, test
            
// //           )
        
// //  } 
// // }

        
// getStorage()
