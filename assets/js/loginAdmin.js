var Users =[
    {
        userName: "Abel",
        passwd : "codify"
    },

    {
        userName: "Kirubel",
        passwd : "object"
    },

    {
        userName: "Alayu",
        passwd : "hfkjl"
    }
]

var button = document.getElementById("button");
button.addEventListener("click",getAdmin)


function getAdmin(ev){
    ev.preventDefault();
    var toGo = false;
    var username = document.getElementById("username").value
    var passwd = document.getElementById("passwd").value;

    var i  = 0
    for(i < 0; i<Users.length; i++){
        if(username == Users[i].userName&&passwd==Users[i].passwd){
            console.log("Username "+username+"Has Logged in");
            location.replace("./Admin.html")
            console.log("Real");
        } 
        else{
            alert("InCorrect Password Please Try Again")
            break;
        }
    }
           

     

}

