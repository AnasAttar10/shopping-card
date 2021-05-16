
// general 

var TheUser="" ; 
var TheAccount ;
var TheIndex ;
var object ;

// end general 


// start index 

if(location.pathname === '/index.html') {

    var users = JSON.parse(localStorage.getItem('users'));
    var products = JSON.parse(localStorage.getItem('products'));
    var big_container = document.getElementById('big_container');

(function getUserNameFromUrl (){  
    let index = location.search.indexOf('=');
    TheUser =  location.search.substring(index+1 , location.search.length) ;
    TheUserAccountInformation();
    adminActions(TheUser);
    let li_user = document.getElementById('username'); // add user name to li 
    li_user.innerHTML += TheUser ; 
})();


function adminActions(user){
    if(user === 'admin'){
        let header_changes = document.getElementById('header') ; 
        header_changes.innerHTML = 
        `
        <div class="container">
            <div class="logo"> <a href="index.html" id="logo">Attar </a> </div>
            <ul id="nav">
                <li id="username">Welcome :  </li>
                <li><a href="login.html" id="logout"> log_out  </a></li>
            </ul>
        </div>
        <i class="fas fa-plus fa-2x" id="admin_plus"></i>
        ` ;
        
        let admin_plus =document.getElementById('admin_plus') ;
        admin_plus.style.display='block';
        admin_plus.onclick = function(){
            location.href = location.href="addproducts.html?TheUser="+TheUser+"&TheIndex="+-1+"&TheState="+false ;
        }

    }
}

function TheUserAccountInformation (){
    let state = false ; 
    let badge_icon = document.getElementById('anas');

    users.forEach((user ,index)=>{
        if(user.name === TheUser){
            TheAccount=user ;
            TheIndex=index ; 
            state = true ;
        } 
    }) ;

    if(state === false && TheUser !== ""){
        location.href ="login.html" ;
    }
    if(TheUser !=="")
        badge_icon.innerHTML =users[TheIndex].product.length; 
} 

(function fetchTheData (){
    
    
    let data =JSON.parse(localStorage.getItem('products')) ; 
    createTheElement(data);
    object = data ;
    
})(); 


function createTheElement(data){

    if(TheUser !== "")
    {
        addTheUserInHeaderToCartProduct();
    }
     
    let id = 0 ;
    if(data !== null){
    data.map(d=>{
        big_container.innerHTML+=`
        <section class="product_card" id="${id++}"> 
            <div class="img_container"><img src="${d.p_image}"></div>
            <div class="product_information">
                <h2>${d.p_name} </h2>
                <h5>${d.p_description}</h5>
                <span> The Quantity : </span><span>${d.p_quantity}</span>
            </div>
            <div class="btns">
                <button onclick='addproduct(this)'>Add product</button>
                <i class="far fa-heart" id="add_fav"></i>
            </div>
        </section>          
        `
    });
}   
    search() ; 

    if(TheUser !== 'admin')
        opacity();

    if(TheUser === 'admin'){
        {
            let logo = document.getElementById('logo') ; 
            logo.href+="?TheUser="+TheUser;   
        }   
    let product_card =document.querySelectorAll('.product_card');
    product_card.forEach((pp ,index) =>{
        pp.classList.add('admin_chnges') ;
        pp.onclick =function(){
            TheIndex=index;
            location.href='edit_product.html?TheUser=' + TheUser + '&TheIndex='+ TheIndex;
        }
    });
    }
}

function createTheElement_search(data){
    let id = 0 ;
    if(data !== null){
    data.map(d=>{
        big_container.innerHTML+=`
        <section class="product_card" id="${id++}"> 
            <div class="img_container"><img src="${d.p_image}"></div>
            <div class="product_information">
                <h2>${d.p_name} </h2>
                <h5>${d.p_description}</h5>
                <span> The Quantity : </span><span>${d.p_quantity}</span>
            </div>
            <div class="btns">
                <button onclick='addproduct(this)'>Add product</button>
                <i class="far fa-heart" id="add_fav"></i>
            </div>
        </section>          
        `
    });
}

}

function addTheUserInHeaderToCartProduct(){
    if(TheUser !== 'admin') {
    let logo = document.getElementById('logo') ; 
        if(! logo.href.includes('?TheUser'))
            logo.href+="?TheUser="+TheUser;
    let li_product = document.getElementById('li_product');
        if(! li_product.href.includes('?TheUser'))
            li_product.href+="?TheUser="+TheUser + "&TheIndex="+TheIndex;
    let a_product = document.getElementById('a_product');
        if(! a_product.href.includes('?TheUser'))
            a_product.href+="?TheUser="+TheUser + "&TheIndex="+TheIndex;
    }
}

function addproduct (el){
    
    if(TheUser === "")
    {
        location.href='login.html';
    }
    else{

        addTheUserInHeaderToCartProduct();

        let product_info =[] ;
        
        let btns = document.querySelectorAll('.btns button') ;

        if(TheUser !== 'admin'){

        btns.forEach((btn ,index)=>{

            if(btn===el)
            The_selected_item= index ;

        }) ; 
        var TheIndex ; 
        if(products[The_selected_item].p_quantity !== 0){ 

        TheAccount.product.push(object[The_selected_item]);       
        users[TheIndex] = TheAccount ;
        products[The_selected_item].p_quantity--;
        localStorage.setItem('products',JSON.stringify(products));
        localStorage.setItem( "users" , JSON.stringify(users));

        element_chosen = el.parentElement.previousSibling.previousSibling.children[0].innerHTML ;

        addProductToBadge(element_chosen);
        
        }

        else{
            alert('this product is empty');
        }

    }
    }
}

function opacity(){
    let product_card =document.querySelectorAll('.product_card');
    let span_quantity =document.querySelectorAll('.product_information span:nth-of-type(even)');
        product_card.forEach((item ,index)=>{
            if(span_quantity[index].innerHTML === '0'){
                item.classList.add('thisempty');
            }
        })
}

function addProductToBadge(element){

    let badge =document.getElementById('badge'); 

    badge.innerHTML += `
    <p>${element}</p>
    `;

    badge.style.opacity=1;
}


function search (){

    let search_input = document.getElementById('search') ;
    let form = document.getElementById('form') ;
    let data_search =JSON.parse(localStorage.getItem('products')) ;
    let thefinalresult= []  ;
    form.onsubmit=function(e){
        e.preventDefault();
    };
    search_input.addEventListener( 'keyup' ,function(e){

    let input_search = search_input.value.trim() ;

    if(input_search === ""){
        console.log('here');
        big_container.innerHTML = "" ;
        createTheElement (JSON.parse(localStorage.getItem('products'))) ;
    }
    else {
        thefinalresult  =  data_search.filter( p=>p.p_name.indexOf(input_search)!=-1 ) ;
        if(thefinalresult !==undefined)
        {
            big_container.innerHTML = "" ;
            createTheElement_search(thefinalresult) ;
        } 
    }

} );

}
}
// end index 
