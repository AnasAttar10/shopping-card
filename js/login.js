if(location.pathname === "/login.html")
{
    var users = JSON.parse(localStorage.getItem('users'));
    var username_log = document.getElementById('username1');
    let password_log = document.getElementById('password1');
    let login = document.getElementById('login1');

    function notifcation (state){
        let notifcation = document.getElementById('notifcation') ;
        notifcation.innerHTML="";
        notifcation.style.opacity =1 ;
        if(state === true)
        {
            notifcation.innerHTML = "The login is correct ! "; 
            notifcation.classList.add("active");
        }
    
        else{
            notifcation.innerHTML = "login is incorrect , please Try Again "; 
            notifcation.classList.remove("active");
        }
    }

    login.addEventListener('click', function(e){
    
    e.preventDefault();

    let stateus = false ; 

    users.forEach((user,index) => {

        if(username_log.value === user.name && password_log.value === user.password)
            {
                TheUser = username_log.value ;
                stateus= true; 
            }
    });

        if(stateus=== true ){
            notifcation(true);
            setTimeout(()=>{
                window.location.href = "index.html?TheUser="+TheUser ;
            },1000);
                                
        }
             
        else{
            notifcation(false)
        }
        username_log.value="" ;
        password_log.value="";   
}
);
}