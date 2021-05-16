
var products = JSON.parse(localStorage.getItem('products'));
var p_information ="";
   
   (function getUserNameFromUrl (){  
        let index = location.search.indexOf('=');
        let index1 = location.search.indexOf('&');
        let index2 = location.search.indexOf('=' , index+1);
        TheUser =  location.search.substring(index+1 , index1);
        TheIndex = location.search.substring(index2+1 , location.search.length) ;

        if(TheUser === ""){
    
            location.href="login.html";
        }
        else {  
            let li_user = document.getElementById('username'); // add user name to li 
            li_user.innerHTML += TheUser ; 
            createTheElement(TheIndex);  
         }
    })();

function addTheUserInHeaderToCartProduct(){
   // if(TheUser !== 'admin') {
    let logo = document.getElementById('logo') ; 
        if(! logo.href.includes('?TheUser'))
            logo.href+="?TheUser="+TheUser;
    //}
}

function createTheElement(theindex){
    let data = products[theindex];
    if(TheUser !== "")
    {
        addTheUserInHeaderToCartProduct();
    }

    let big_container = document.getElementById('edit_product'); 

    big_container.innerHTML+=`
    <div class="img">
        <img src="${data.p_image}" alt="">
    </div>
    <div class="information_product">
        <h2>${data.p_name} </h2>
        <p>${data.p_description} </p>
        <span>The Quantity : </span> <span> ${data.p_quantity} </span>
        <button id="edit" onclick="edit_product(${theindex})">Edit </button>
        <button id="remove" onclick="remove_product()">Remove </button>
    </div>

    `;
    
}

function edit_product(theindex){

    location.href="addproducts.html?TheUser="+TheUser+"&TheIndex="+theindex+"&TheState="+true ;

}

function remove_product(){
    products.splice(TheIndex , 1 ) ;
    localStorage.setItem('products' , JSON.stringify(products)) ;
    location.href="index.html?TheUser="+TheUser;
}