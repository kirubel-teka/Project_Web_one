var test = document.getElementById("test").innerHTML ="YES I AM A TEST"
var submitContact = document.getElementById("submit_contact").addEventListener("click",submit)
// data of the user

 function submit(ev) {
     ev.preventDefault();

   
    let openRequest = indexedDB.open("Contact Database",1);

    openRequest.onupgradeneeded = ()=>{
            let openRequestdb = openRequest.result;

            let contacts = openRequestdb.createObjectStore("contacts",{autoIncrement:true});
            console.log("database upgraded");
    }

    openRequest.onsuccess = ()=>{
        let openRequestdb = openRequest.result;
        let transaction = openRequestdb.transaction("contacts","readwrite");

        let newContact  = transaction.objectStore("contacts");
        // var a = JSON.parse(nameOfUser);

        var mycontact =  {
            name:document.getElementById("user_name").value,
            emailOfUser:document.getElementById("user_email").value,
            messageOfUser : document.getElementById("user_message").value,
            subjectOfUser :document.getElementById("user_subject").value


        }
        console.log("the user");
      
        newContact.put(mycontact)

       
    }
 }