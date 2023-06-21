var nameKey = document.getElementById('prenom')

document.getElementById('clickMe').addEventListener("click", function(event){
        if(nameKey.value){
        localStorage.setItem("prenom", nameKey.value )
        window.location.href = "item.html";
        }
    
        else if (nameKey.value !== true){
             alert ("Veuillez remplir le champ")

            }          
            event.preventDefault()

        });
    
