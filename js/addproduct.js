
// start add product 

    let p_name = document.getElementById('p_name') ;
    let p_description = document.getElementById('p_description') ;
    let p_quantity = document.getElementById('p_quantity') ;
    let p_image = document.getElementById('p_image') ;
    let test = document.getElementById('test') ;
    let p_submit= document.getElementById('p_submit') ;
    var TheState ; 

    let products = localStorage.getItem('products')=== null ? [] : JSON.parse(localStorage.getItem('products')) ; 
    
    let products_information ={
        p_name : "",  
        p_description : "",
        p_quantity : 0 , 
        p_image : ""
    } ;
    
   
    (function getUserNameFromUrl (){  
      let index = location.search.indexOf('=');
      let index1 = location.search.indexOf('&');
      let index2 = location.search.indexOf('=' , index+1);
      let index3 = location.search.indexOf('&' , index1+1);
      let index4 = location.search.indexOf('=' , index2+1);
      TheUser =  location.search.substring(index+1 , index1);
      TheIndex =  location.search.substring(index2+1 , index3);
      TheState = location.search.substring(index4+1 , location.search.length) ;

     YouFromEditPage(TheState);
      if(TheUser === ""){
  
          location.href="login.html";
      }
      else {  
          let li_user = document.getElementById('username'); // add user name to li 
          li_user.innerHTML += TheUser ;  
       }
  })();

function YouFromEditPage(thestate){
  
  if(thestate === 'true'){
    p_name.value=products[TheIndex].p_name ;
    p_description.value=products[TheIndex].p_description ;
    p_quantity.value=products[TheIndex].p_quantity ;
    p_image.setAttribute('src' , products[TheIndex].p_image) ;
    p_image.style.display='block';
  }
}

(function addTheUserInHeaderToCartProduct(){
  //if(TheUser !== 'admin') {
  let logo = document.getElementById('logo') ; 
      if(! logo.href.includes('?TheUser'))
          logo.href+="?TheUser="+TheUser;
  //}
})();

    p_submit.onclick=function(e){
        e.preventDefault();
        if(p_name!=="" && p_description !=="" && p_quantity!=="" && p_image !== ""){
            products_information['p_name'] = p_name.value ;
            products_information['p_description'] = p_description.value ;
            products_information['p_quantity'] = p_quantity.value ;
            products_information['p_image'] = p_image.src ;
            if(TheState==='true'){
              products.splice(TheIndex , 1 );
              products[TheIndex]=products_information ; 
              
            }
            else if(TheState === 'false') {
              products.push(products_information);
            }
           localStorage.setItem('products' , JSON.stringify(products)) ;
        }
        if(TheState==='true'){
          console.log('yes');
          location.href="index.html?TheUser="+TheUser;
        }
        else if(TheState === 'false'){
          location.reload();
        }       
    }

    var url_image ='';
    function readURL(input) {
        if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {
            url_image = e.target.result ;
            p_image.setAttribute('src', e.target.result);
            p_image.style.width="50px";
            p_image.style.height="50px";
            p_image.style.display="block";
          };
          reader.readAsDataURL(input.files[0]);
        }
        
      }


   

// end add product 