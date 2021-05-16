
if(location.pathname === "/register.html")
{
let username = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');
let submit = document.getElementById('submit');
let user_info = {
    "name" : '' , 
    "email":'',
    "password":'',
    "product":[] ,
    "favourite":[]
} ; 

if(localStorage.getItem('users') == null)
    {
        var arr_users = [] ; 
    }
else
    {   
        var arr_users = JSON.parse(localStorage.getItem('users'));
    }

function notifcation (state){
    let notifcation = document.getElementById('notifcation') ;
    notifcation.style.opacity =1 ;
    if(state === true)
    {
        notifcation.innerHTML = "The Register is done ! "; 
        notifcation.classList.add("active");
    }

    else{
        notifcation.innerHTML = "Registration is incorrect , please Try Again "; 
        notifcation.classList.remove("active");
    }
}
 
function checkTheUserName (me){
    state = true  ;
    arr_users.forEach((user)=>{
        if(user.name === me)
            state=false ;
    }) ; 

    return state ; 
}

function EmptyTheValues (){

        username.value="";
        email.value="";
        password.value="";

        user_info = {
            "name" : '' , 
            "email":'',
            "password":'',
            "product":[] ,
            "favourite":[]
        } ;
}

submit.onclick=function(e){

    e.preventDefault();

    arr_users = JSON.parse(localStorage.getItem('users')) === null ? [] : JSON.parse(localStorage.getItem('users')) ;
    
    if(username.value!="" && email.value!="" && password.value!="" && checkTheUserName(username.value))
    {

        user_info.name=username.value;
        user_info.email=email.value;
        user_info.password=password.value;

        arr_users.push(user_info) ; 
        
        localStorage.setItem( "users" , JSON.stringify(arr_users));

        
        notifcation (true) ; 
        setTimeout(()=>{
            location.href = "login.html" ; 
        },2000);
    }
    else{
        notifcation (false);
    }

     EmptyTheValues (); 

}
}
// end register