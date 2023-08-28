//global buttons 
const toggleBtn = document.querySelector(".toggle");
const formWrapper = document.querySelector('.form-wrapper');
const nextBtns = document.querySelectorAll(".btn-next");
const backBtns = document.querySelectorAll(".btn-back");
const innerformWrapper = document.querySelectorAll('.innerform-wrapper');
const steps = document.querySelectorAll(".step");


let yearlySub; //to keep track of user selection either monthly or yearplan


// eventlisterner that toggle between monthly plan and yearplan
toggleBtn.addEventListener('click', ()=>{
    planSelection = undefined;//set to underfined so as to remove user selection if user switch between monthly and yearly plan
    userSubscription = [];
    
   
    
    jsAddOnBoxes.forEach((jsAddOnBox)=>{
        jsAddOnBox.classList.remove("active");//remove add-on box state
    })
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');//deselect all checked box if user switch plan
        checkboxes.forEach((checkbox)=>{
            checkbox.checked=false;
        })
        
      

    if(!formWrapper.classList.contains("active")){
        formWrapper.classList.add("active")
        yearlySub = true;
    }else{
      formWrapper.classList.remove("active"); 
      yearlySub = false; 
    }
    
})


let count = 0;

//personal info code starts here
const infoBtn = document.querySelector(".info-btn")

infoBtn.addEventListener("click", ()=>{
        validateEmail();
        validatePhone();
        validateUsername()
    // adding slider to the next btn 
    if(phoneValidate && emailValidate && unsernameValidate){
        count++;
        innerformWrapper.forEach((innerformWrapper)=>{
        innerformWrapper.style.transform = `translateX(-${count*110}%)`;
       })
       stepsPointer(); 
    }   
      
       
 })



 //form validation functions
const form = document.querySelector('form');


//email validation
let emailValidate = false;
const emailWarning = document.querySelector(".emailWarning");
function validateEmail(){
    const email = form.querySelector('[type="email"]');
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email.value===""){
        emailWarning.innerText = "this field is required";
        email.style.outline=`1px solid red`;
        setTimeout(()=>{
            emailWarning.innerText = "";
            email.style.outline="";
        },1000)
    }

    else if(!email.value.match(pattern)){
        emailWarning.innerText = "please enter valid email";
        email.style.outline=`1px solid red`;
        setTimeout(()=>{
            emailWarning.innerText = "";
            email.style.outline="";
        },1000)
    }else{
        emailValidate = true;
    }
}

//phone number validation
const numberWarning = document.querySelector(".numberWarning");
let phoneValidate = false;
function validatePhone(){
    const number = form.querySelector('[type="number"]');
    const pattern = /^\d{8,}$/
    if(number.value===""){
        numberWarning.innerText = "this field is required";
        number.style.outline=`1px solid red`;
        setTimeout(()=>{
            numberWarning.innerText = "";
            number.style.outline="";
        },1000)
    }
    else if(!number.value.match(pattern)){
        numberWarning.innerText = "please enter valid number";
        number.style.outline=`1px solid red`;
        setTimeout(()=>{
            numberWarning.innerText = "";
            number.style.outline="";
        },1000)
    }else{
        phoneValidate = true;
    }
}
//username validation
const usernameWarning = document.querySelector(".UsernameWarning")
let unsernameValidate = false;
function validateUsername(){
    const username = form.querySelector('[type="text"]');
    const pattern = /^[A-Za-z\s.'-]+$/;
    if(username.value===""){
        usernameWarning.innerText = "this field is required";
        username.style.outline=`1px solid red`;
        setTimeout(()=>{
            usernameWarning.innerText = "";
            username.style.outline="";
        },1000)
    }else if(!username.value.match(pattern)){
        usernameWarning.innerText = "enter valid name";
        username.style.outline=`1px solid red`;
        setTimeout(()=>{
            usernameWarning.innerText = "";
            username.style.outline="";
        },1000)
    
    }else{
        unsernameValidate = true;
    }
}


//back to previous page
backBtns.forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        unsernameValidate = false; //incase user press nextbtn after verification and went back to deleted field
        phoneValidate = false;
        emailValidate = false;
        count--;
       innerformWrapper.forEach((innerformWrapper)=>{
        innerformWrapper.style.transform = `translateX(-${count*110}%)`;
       })

       stepsPointer();
    })
})



// function toggeling the stages of the form (sidebar)
function stepsPointer(){
    steps.forEach((step)=>{
        const id = step.dataset.id
        if (id == count){
            steps.forEach((step)=>{
                step.classList.remove("active");
            })
            step.classList.add("active");
        }
        
       })
}







// select your plans code starts here

const planNextBtn = document.querySelector(".plan-Nextbtn");

planNextBtn.addEventListener("click", ()=>{
    // pushing planselection object to empty array

    if(planSelection===undefined){
        count=count;
        Swal.fire({
            title:"select a plan",
            icon:"warning",
            });
        return;
    }else{
            count++;
            innerformWrapper.forEach((innerformWrapper)=>{
            innerformWrapper.style.transform = `translateX(-${count*110}%)`;
           })
           stepsPointer(); 
    }
   
})



let planSelection; //this save the plan selected and overwritten if another plane is being selected
const selectYourPlans = document.querySelectorAll(".js_select_plan");//each select plan box
selectYourPlans.forEach((selectYourPlan)=>{
    selectYourPlan.addEventListener('click', ()=>{
        //toggle active classList of the selected plan
        selectYourPlans.forEach((selectYourPlan)=>{
            selectYourPlan.classList.remove("active");
             })
            selectYourPlan.classList.add("active");

       const price = selectYourPlan.querySelector('.plan_price').innerHTML;
       const plan = selectYourPlan.querySelector('h2').innerHTML;
       //overwriteen the plan selected if use change selection
       planSelection = {
        price:Number(price),
        plan:plan
       }

      
    })
})





// pick add-ons coding starts here
const addOnsBtn = document.querySelector(".add-on-btn")
const jsAddOnBoxes = document.querySelectorAll(".jsAddOnBox");


let addOnSelected; //this save the final addOns selected by user

addOnsBtn.addEventListener("click", ()=>{
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');//deselect all checked box if user switch plan

    

    let currentCheckedBox = []; // this save the current box being checked by user
    if(checkboxes.length===0){
        count=count;
        Swal.fire({
            title:"pick add-ons",
            icon:"warning",
            });
        return;
    }else{
            count++;
            innerformWrapper.forEach((innerformWrapper)=>{
            innerformWrapper.style.transform = `translateX(-${count*110}%)`;
           })
           stepsPointer(); 
           
           
           
            const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
            checkboxes.forEach((checkedBox)=>{
                currentCheckedBox.push ({
                    name:checkedBox.name,
                    price:Number(checkedBox.value)
                })
            })
          
            addOnSelected = currentCheckedBox; //instead of push i re-asign, so as to overwrite previous selection by user

          
    }
    finishingUp();
})



jsAddOnBoxes.forEach((jsAddOnBox)=>{
    jsAddOnBox.addEventListener("click", ()=>{
        jsAddOnBox.classList.toggle("active");
        const checkbox = jsAddOnBox.querySelector('[type="checkbox"]');
        if(checkbox.checked){
            checkbox.checked = false;
            
        }else{
            checkbox.checked = true;
        }

    })
    
});


// finishing up code starts here
// this render all the user selection for confirmation
const htmlElement = document.querySelector(".finishing-up-item-wrapper")
function finishingUp(){
    let renderConfirmation = '';

    if(yearlySub){
        renderConfirmation +=  ` 
          <div class="box">
            <div class="content" >
              <h3>${planSelection.plan}(Yearly)</h2>
              <p class="changePlan">Change</p>
            </div>
            <p class="price">$${planSelection.price}/yr</p>
          </div>
      `
      addOnSelected.forEach((item)=>{
        renderConfirmation +=`
        <div class="box">
            <p>${item.name}</p>
            <p class="price">+$${item.price}/yr</p>
        </div>`
      })

      let totalPrice=0;
      addOnSelected.forEach((item)=>{
        totalPrice+=item.price;
      })
      totalPrice+=planSelection.price;
      renderConfirmation+= `
        <div class="total">
            <p>Total (per year)</p>
            <p class="total-price">$${totalPrice}/yr</p>
        </div>
      `
     htmlElement.innerHTML = renderConfirmation;
     
    }else{
        renderConfirmation +=  ` 
          <div class="box heading">
            <div class="content" >
              <h3>${planSelection.plan}(Monthly)</h2>
              <p class="changePlan">Change</p>
            </div>
            <p class="price">$${planSelection.price}/mo</p>
          </div>
      `

      addOnSelected.forEach((item)=>{
        renderConfirmation +=`
        <div class="box">
            <p>${item.name}</p>
            <p class="price">+$${item.price}/mo</p>
        </div>`
      })

      let totalPrice=0;
      addOnSelected.forEach((item)=>{
        totalPrice+=item.price;
      })
      totalPrice+=planSelection.price;
      renderConfirmation+= `
        <div class="total">
            <p>Total (per month)</p>
            <p class="total-price">$${totalPrice}/mo</p>
        </div>
      `
      htmlElement.innerHTML = renderConfirmation;
    }

    changePlan();
}


//confirm btn 
const confirmBtn = document.querySelector(".confirmBtn");
confirmBtn.addEventListener("click", ()=>{
            count++;
            innerformWrapper.forEach((innerformWrapper)=>{
            innerformWrapper.style.transform = `translateX(-${count*110}%)`;
           })
})


//change plan on confirmation page 
function changePlan(){
    const changePlan = document.querySelector(".changePlan")
    changePlan.addEventListener("click", ()=>{
        count = 1;
        innerformWrapper.forEach((innerformWrapper)=>{
        innerformWrapper.style.transform = `translateX(-${count*110}%)`;
       })
       stepsPointer();
    })
}
