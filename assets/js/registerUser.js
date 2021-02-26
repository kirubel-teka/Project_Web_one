var username = document.getElementById("username").value
var passwd = document.getElementById("passwd").value;

var myButton = document.getElementById("button");

myButton.addEventListener("click", register);
 

function register(ev) {
    ev.preventDefault();


  
   let openRequest = indexedDB.open("Users",1);


   openRequest.onupgradeneeded = ()=>{
           let openRequestdb = openRequest.result;
          
           let contacts = openRequestdb.createObjectStore("User",{autoIncrement:true});
           console.log("database upgraded");
   }

   openRequest.onsuccess = ()=>{
       let openRequestdb = openRequest.result;
       let transaction = openRequestdb.transaction("User","readwrite");

       let Admins  = transaction.objectStore("User");


       var admin =  {
           name:document.getElementById("username").value,
           passwd:document.getElementById("passwd").value,

       }
   
     
       Admins.put(admin);
       alert('You Are Succesfully Register to Database as A User');
       location.replace("./index.html")
        
   }
}

