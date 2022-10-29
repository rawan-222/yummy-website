let link=`https://www.themealdb.com/api/json/v1/1/search.php?s=`
async function test(){
    let response=await fetch(link)
    let res =await response.json();
 display(res.meals)
 ins(res.meals)
 
 
 
 
   }
   
 function display(array){
    let cartona=""
    for(let i=0;i<array.length;i++){
    cartona+=`<div class="col-xl-3 col-md-6 col-sm-12" >
    <figure class="position-relative">
    <img src="${array[i].strMealThumb}" alt="meal image" class="w-100">
    <div id="${array[i].idMeal}" class="mealname w-100 px-3 d-flex align-items-center position-absolute ">
    <h2 class="fw-lighter">${array[i].strMeal}</h2></div>
    </figure>
    </div>`

}
   
   $($("#allmeals .row ")).html(cartona)
   if($("#search").css("display")=="block"){
    $(".searchresult").html(cartona)
   }
}
async function main(link){
    let response=await fetch(link)
    let res =await response.json();
    ins(res.meals);
}

function ins(myarray){
    $(".mealname").click(function(){
        let tag=""
        let Recipes=""
        $('#allmeals ,#search,#Areas,#mealsofarea').fadeOut(200)
        $('#Instructionsofmeals').fadeIn(200)
       for(let i=0;i<myarray.length;i++){
          if($(this).attr("id")==myarray[i].idMeal){
            let array=myarray[i]
            for(let i=1;i<=20;i++){
                if(array[`strIngredient${i}`]!=""&&array[`strMeasure${i}`]!=""){
                    Recipes+=`<li class="px-2 rounded-2 text-black"> "${ array[`strMeasure${i}`] +  array[`strIngredient${i}`]}"</li>`
                   }}
            if(myarray[i].strTags!=null && !myarray[i].strTags.includes(",")){
                 tag= `<p class="tags px-2 py-1 rounded-2 text-black mt-2"> ${myarray[i].strTags} </p>`
            }
            else if(myarray[i].strTags!=null&&myarray[i].strTags.includes(",")){
              let newTag = myarray[i].strTags.split(",")
                for(let i=0;i<newTag.length;i++)
                {
                    tag+=`<p class="tags px-2 py-1 rounded-2 text-black me-2 mt-2"> ${newTag[i]} </p>`
                }
            }
            $('#Instructionsofmeals .row').html(
                ` <div class="col-md-4 col-sm-12 py-5">
                <div class="text-center">
                    <img src="${myarray[i].strMealThumb}" alt="meal image" class="w-100">
                <h2 class="fw-lighter text-white fs-1">${myarray[i].strMeal}</h2>
                </div>
            </div>
            <div class="col-md-8 col-sm-12 text-white py-5">
                <div>
                    <h2 class="fw-lighter">
                        Instructions
                    </h2>
                    <p>${myarray[i].strInstructions}</p>
                    <h4 class="fw-lighter">Area : ${myarray[i].strArea}</h4>
                    <h4 class="fw-lighter">Category : ${myarray[i].strArea}</h4>
                    <h4 class="fw-lighter">Recipes :</h4>
                    <ul class="list-unstyled d-flex flex-wrap ">
                    ${Recipes}
                    </ul>
                    <h4 class="fw-lighter">Tags : <br/> ${tag}</h4>
                    
                    <br/>
                    <a href="${myarray[i].strSource}" target="_blank"><button class="btn btn-success mt-3">Source</button></a>
                    <a href="${myarray[i].strYoutube}" target="_blank"><button class="btn btn-danger mt-3">Youtub</button></a>
                </div>
            </div>`
            )}
       }})}
       
function closeList(){
    $('.list').animate({"left":"0"},500)
    $('.listcontent').animate({"left":-listWidth},500)
        $('.listcontent h5').eq(0).animate({marginTop:"150px","opacity":"0"},44,function(){
            $('.listcontent h5').eq(1).animate({marginTop:"150px","opacity":"0"},43,function(){
                $('.listcontent h5').eq(2).animate({marginTop:"150px","opacity":"0"},42,function(){
                    $('.listcontent h5').eq(3).animate({marginTop:"150px","opacity":"0"},41,function(){
                        $('.listcontent h5').eq(4).animate({marginTop:"150px","opacity":"0"},40)
                    })
                })
            })
        })
    
    $('.list>i').attr('class','fa fa-align-justify fa-2xl')
    
}
let listWidth=$('.listcontent').innerWidth();
$('.list>i').click(function(){
    if($('.list>i').attr('class')=='fa fa-align-justify fa-2xl'){
    $('.listcontent').animate({"left":0},500,function(){
        $('.listcontent h5').eq(0).animate({margin:0,"opacity":"1"},800)
            $('.listcontent h5').eq(1).animate({margin:0,"opacity":"1"},801)
                $('.listcontent h5').eq(2).animate({margin:0,"opacity":"1"},802)
                    $('.listcontent h5').eq(3).animate({margin:0,"opacity":"1"},803)
                        $('.listcontent h5').eq(4).animate({margin:0,"opacity":"1"},805)
                    })
               
            
        
    
 $('.list').animate({"left":listWidth},500)
    $('.list > i').attr('class','fa fa-align-justify fa-times fa-2xl')

}
else{
    closeList()
    }
})
async function Area(){
    link=`https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    let response=await fetch(link)
    let res =await response.json();
    let html=""
    for(let i=0;i<res.meals.length;i++){
    html+=`<div class="col-lg-3 col-md-6 col-sm-12"  id="${res.meals[i].strArea}">
    <div class=" mx-2 px-3 text-center">
        <i class="fa-solid fa-city fa-3x text-danger mb-3"></i>
        <h2 class=" text-white fw-lighter  area">${res.meals[i].strArea}</h2>
    </div>
</div>`}
$("#Areas .row").html(html)
$(" #Areas .col-lg-3 ").click(function(){
    
   mealOfArea($(this).attr("id"))
   $("#Areas").fadeOut(500)
    $("#mealsofarea").fadeIn(500)
})
}
async function mealOfArea(elementId){
    link=`https://www.themealdb.com/api/json/v1/1/filter.php?a=${elementId}`
    let response=await fetch(link)
    response =await response.json();
    $("#Area").fadeOut(200)
    $("#allmeals").fadeIn(200)
    display(response.meals)
$(".mealname").click(function(){
    main(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${$(this).attr("id")}`)
})
   
    
}


$(".Area").click(function(){
    $("#Areas").fadeIn(500)
    $("#allmeals ,#Instructionsofmeals ,#search,#category,#contacus,#Ingredients").fadeOut(500)
    Area()
    closeList()
    $(".loadingscrean").css("display","flex")
    $(document).ready(function(){
        $(".loadingscrean").fadeOut(700,function(){
            $(document.body).css("overflowY","visible")
        })
    })
})
$(".category").click(function(){
    $(".loadingscrean").css("display","flex")
    $(document).ready(function(){
        $(".loadingscrean").fadeOut(700,function(){
            $(document.body).css("overflowY","visible")
        })
    })
    $("#category").fadeIn(500)
    $("#allmeals ,#Instructionsofmeals ,#search ,#Areas,#Ingredients,#contacus").not("#category").fadeOut(500)
    category()
    closeList()
})
async function category(){
  link=`https://www.themealdb.com/api/json/v1/1/categories.php`
  let response=await fetch(link)
    let res =await response.json();
    let cartona=""
    for(let i=0;i<res.categories.length;i++){
        cartona+=`<div class="col-xl-3 col-md-6 col-sm-12 py-5"  >
        <figure class="position-relative">
        <img src="${res.categories[i].strCategoryThumb}" alt="meal image" class="w-100">
        <div class="mealname w-100 px-3 text-center align-items-center position-absolute" id="${res.categories[i].strCategory}">
        <h2 class="fw-lighter">${res.categories[i].strCategory}</h2>
        <p class="fw-lighter">${res.categories[i].strCategoryDescription.substring(0,100)}</p>
        </div>
        </figure>
        </div>`
    
    }
$("#category .row").html(cartona)
$(".mealname").click(function(){
    categoryResult($(this).attr("id"))
    $(".loadingscrean").css("display","flex")
    $(document).ready(function(){
        $(".loadingscrean").fadeOut(800,function(){
            $(document.body).css("overflowY","visible")
        })
    })
  ;
})

}
async function categoryResult(id){
    link=`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`
    let response=await fetch(link)
    let res =await response.json();
    $("#category").fadeOut(200)
    $("#allmeals").fadeIn(200)
    display(res.meals)
    $(".mealname").click(function(){
    main(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${$(this).attr("id")}`)
  
    
})
    
}
$(".Ingredients").click(function(){
    $(".loadingscrean").css("display","flex")
    $(document).ready(function(){
        $(".loadingscrean").fadeOut(700,function(){
            $(document.body).css("overflowY","visible")
        })
    })
    $("#allmeals ,#Instructionsofmeals ,#search ,#Areas,#category,#contacus").fadeOut(500)
    $("#Ingredients").fadeIn(500)
    getIngredients()
    closeList()
})
async function getIngredients(){
    link=`https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    let response=await fetch(link)
    let res =await response.json();
   let html=""
for(let i=0;i<20;i++)
{
    html+=`<div class="col-xl-3 col-md-6 col-sm-12 py-3" id="${res.meals[i].strIngredient}">
    <div class="text-center">
        <i class="fa-solid fa-bowl-food fa-3x text-success"></i>
        <h2 class="lighter text-white">${res.meals[i].strIngredient}</h2>
        <p class="lighter text-white">${res.meals[i].strDescription.substring(0,130)}</p>
    </div>
</div>`
}
$("#Ingredients .row").html(html)
$("#Ingredients .col-xl-3").click(async function(){
    $(".loadingscrean").css("display","flex")
    $(document).ready(function(){
        $(".loadingscrean").fadeOut(800,function(){
            $(document.body).css("overflowY","visible")
        })
    })
    link=`https://www.themealdb.com/api/json/v1/1/filter.php?i=${$(this).attr("id")}`
    let response=await fetch(link)
    let res =await response.json();
    $("#Ingredients").fadeOut(500)
    $("#allmeals").fadeIn(500)
    display(res.meals)
    $(".mealname").click(async function(){
        main(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${$(this).attr("id")}`)
    })
})


}
$(".search").click(function(){
    $("#allmeals ,#Ingredients,#Instructionsofmeals ,#Areas,#category").fadeOut(500)
    $("#search").fadeIn(500)
   closeList()
    searchByName()
    document.getElementById("input1").value=""
})
async function searchByName(){
        $(".searchByName ").keyup(async function(e){
            link=`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.value}`
            let response=await fetch(link)
            let res =await response.json();
            if(this.value!=""&& e.code!='Space'){
                $(".loadingscrean").css("display","flex")
                $(document).ready(function(){
                    $(".loadingscrean").fadeOut(200,function(){
                        $(document.body).css("overflowY","visible")
                    })
                })  
                display(res.meals)
                $(".mealname").click(function(){
                    main(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${$(this).attr("id")}`)})
                   
            }
            else{
                $(".searchresult").html("")
            }
            
        })
        $(".searchByLetter ").keyup(async function(e){
            $(".loadingscrean").css("display","flex")
                $(document).ready(function(){
                    $(".loadingscrean").fadeOut(200,function(){
                        $(document.body).css("overflowY","visible")
                    })
                })  
            let rege1=/^[a-z]{1}$/
            if(rege1.test(this.value)){
            link=`https://www.themealdb.com/api/json/v1/1/search.php?f=${this.value}`
            let response=await fetch(link)
            let res =await response.json();
            if(this.value!=""&& e.code!='Space'){
                display(res.meals)
                $(".mealname").click(function(){
                    main(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${$(this).attr("id")}`)})  
            }}
            else{
                $(".searchresult").html("")
            }
           
        })
       
        

    
}
$(".contactus").click(function(){
    test()
    $("#contacus").fadeIn(500)
    $("#allmeals ,#Instructionsofmeals ,#search ,#Area,#category,#Ingredients").fadeOut(500)
   closeList()
   validation()
  
})
let regexPhone=/^01[0125][0-9]{8}$/
let regexEmail=/^\w+@\w+.+\w$/
let regexName=/^[a-z]{1,}$/
let regexAge=/^[0-9]{0,2}$/
let regexPassword=/(?=.*[0-9])(?=.*[a-z])(?=.{8,})|(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
function validation (){
   $("#password").keyup(function(){
        regex(this.value,$(this).attr("id"),regexPassword)
    
    })

    $("#name").keyup(function(){
        regex(this.value,$(this).attr("id"),regexName)
    
    })
    $("#phone").keyup(function(){
        regex(this.value,$(this).attr("id"),regexPhone)
    
    })
    $("#email").keyup(function(){
        regex(this.value,$(this).attr("id"),regexEmail)
    }
    )
    $("#age").keyup(
        function(){
            regex(this.value,$(this).attr("id"),regexAge)
        }

    )
    function regex(x,y,z){
        if(z.test(x)){
            $("#"+y).css("border-color","#28a745")
            $("#contacus ."+y+" i").removeClass("fa-xmark text-danger ").addClass("fa-check text-success")
            $(".alert"+y).hide()
         
        }
        else{
            $("#"+y).css("border-color","#dc3545")
            $("#contacus ."+y+" i").removeClass("fa-check  text-success").addClass("fa-xmark text-danger")
            $(".alert"+y).show()
        }
        disabledBtn()
    }
    $("#repassword").keyup(
        function(){
            if(document.getElementById("password").value==this.value){
                $("#repassword").css("border-color","#28a745")
                $("#contacus .repassword i").removeClass("fa-xmark text-danger ").addClass("fa-check text-success")
                $(".alertrepassword").hide()
            }
            else{
                $("#repassword").css("border-color","#dc3545")
            $("#contacus .repassword i").removeClass("fa-check  text-success").addClass("fa-xmark text-danger")
            $(".alertrepassword").show()
            }
            disabledBtn()
        }
    )
    

   

}

function disabledBtn(){
    console.log(document.getElementById("password").value==document.getElementById("repassword").value&&regexName.test(document.getElementById("name").value)&&regexAge.test(document.getElementById("age").value)&&regexEmail.test(document.getElementById("email").value)
    &&regexPassword.test(document.getElementById("password").value)&&regexPhone.test(document.getElementById("phone").value))
    
    if (document.getElementById("password").value==document.getElementById("repassword").value&&regexName.test(document.getElementById("name").value)&&regexAge.test(document.getElementById("age").value)&&regexEmail.test(document.getElementById("email").value)
    &&regexPassword.test(document.getElementById("password").value)&&regexPhone.test(document.getElementById("phone").value)) {
        $(".btn").removeClass("disabled  btn-outline-danger").addClass("mybtn")
        $(".btn").click(function(){
            document.getElementById("password").value=""
            document.getElementById("repassword").value=""
            document.getElementById("name").value=""
            document.getElementById("age").value=""
            document.getElementById("email").value=""
            document.getElementById("phone").value=""




        })
        
    }
}
$(document).ready(function(){
    $(".loadingscrean").fadeOut(700,function(){
        $(document.body).css("overflowY","visible")
    })})

    
test()