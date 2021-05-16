// start cart_product 

if(location.pathname === '/cart_product.html'){

    var users = JSON.parse(localStorage.getItem('users'));
    var products = JSON.parse(localStorage.getItem('products'));

    var logout =  document.getElementById('logout');
    
    var Not_duplicate_product=[];
    
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
            TheAccount = users[TheIndex]; 
            let data =TheAccount.product ;
            createTheElement(data);  
         }
    })();

    function addTheUserInHeaderToIndex(){
        let logo = document.getElementById('logo') ; 
        logo.href+="?TheUser="+TheUser;
    } 
    
    function createTheElement(data){
    
        let big_container = document.getElementById('big_container'); 
        
        addTheUserInHeaderToIndex();
        data.map(d=>{
            if(! Not_duplicate_product.includes(d.p_name)){
                Not_duplicate_product.push(d.p_name);
            big_container.innerHTML+=`
            <section class="product_card" id="${d.id}"> 
                <div class="img_container"><img src="${d.p_image}"></div>
                <div class="product_information">
                    <h2>${d.p_name} </h2>
                    <h5>${d.p_description}</h5>
                    <span>The Quantity : </span><span>${increseQuantity(data , d)}</span>
                </div>
                <div class="btns">
                <button onclick='RemoveCart(this)'>Remove Cart </button>
            </div>
            </section>          
            `
            }
        })
    }
    
    function increseQuantity(data , currentproduct){
        let counter = 0 ; 
        data.map((d)=>{
            if(currentproduct.p_name === d.p_name){
                counter++ ; 
            }
        }) ;
    return counter ;
    }

    function RemoveCart (el){
            
            let btns = document.querySelectorAll('.btns button') ;
            let names =document.querySelectorAll('.product_information h2') ;
            var name ; 
            btns.forEach((btn ,index)=>{
    
                if(btn===el)
                {
                    The_selected_item= index ;
                    name = names[index].innerHTML.trim() ; ;
                    // console.log(name);
                }
            }) ; 

            let number = increseQuantity(TheAccount.product ,TheAccount.product[The_selected_item]);

            products.map((product)=>{

                let newname=product['p_name'].trim() ; 
                
                if(newname === name)
                {
                    product.p_quantity ++ ;       
                }
            }) 

            TheAccount.product.splice(The_selected_item,1);
                    
            users[TheIndex] = TheAccount ;
            
            localStorage.setItem( "users" , JSON.stringify(users));
            localStorage.setItem( "products" , JSON.stringify(products));

            location.reload();
    
    }

    }
    
    // end cart_product 