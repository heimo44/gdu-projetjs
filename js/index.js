var nameKey = document.getElementById('prenom')

document.getElementById('clickMe').addEventListener("click", function(event){
    event.preventDefault()     
    function setData(){
        if (nameKey.value !== localStorage.getItem("prenom") || nameKey.value !== null){

            const data = fetch("https://my-json-server.typicode.com/heimo44/gdu-projetjs/db");
            
            async function setLocalStorage() {
   
                const response = await fetch("https://my-json-server.typicode.com/heimo44/gdu-projetjs/db");
            
                var data = await response.json();  
             
                    startSession(data);    
            }
            
           setLocalStorage();
    }
    
    if(nameKey.value && nameKey.value !== localStorage.getItem("prenom")){
                
        
        function startSession(data){

            window.location.href = "tasks.html";
            localStorage.setItem("prenom", nameKey.value)
            for (let i = 0; i <= data.todolist.length; i++){
                let z = i + 1
                let y = "data" + z
                let tags = data.todolist[i].Tags
                let tagsStr = JSON.stringify(tags)
                let value = `
                {"id": ${data.todolist[i].id},
                "text": "${data.todolist[i].text}",
                "created_at": "${data.todolist[i].created_at}",
                "Tags": ${tagsStr},
                "is_complete": ${data.todolist[i].is_complete}}
              ` 
                localStorage.setItem(y , value)
                
            }
        }
        
        
} 

else if (nameKey.value === localStorage.getItem("prenom")){
    window.location.href = "tasks.html";
}

else {
    alert ("Veuillez remplir le champ")
   }  
        

}
    setData();
    });
