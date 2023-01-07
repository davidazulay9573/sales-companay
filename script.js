
import Company from "./company.js";
import Workspace from "./workspace.js";
import Social_network from "./social_network.js";
import DisplayTOHTML from "./displayHtml.js";


const company = new Company();
const workspace = new Workspace();
const displayHtml = new DisplayTOHTML();
const social_network = new Social_network();

const header = document.getElementById("header");
const containerA1 = document.getElementById("containerA1");
const containerA2 = document.getElementById("containerA2");
const containerB = document.getElementById("containerB");

if (company.productsFromeLocalStorge == null) {
  localStorage.setItem("products", JSON.stringify([{ name: "example" }]));
}
if (company.customersFromeLocalStorge == null) {
  localStorage.setItem("customers", JSON.stringify([{ name: "example" }]));
}
if (company.DailyReportFromeLocalStorge == null) {
  localStorage.setItem("daily", JSON.stringify([{'name':'example'}]));
}

if(company.employeeFromeLocalStorge == null){ 
   localStorage.setItem(
     "employees",
     JSON.stringify([
       {
         'userName': "example",
         'email': '@',
         'password' : '11',
         'rating' : 0,
  

         'businessDays' : [],
         'productsSold' : [],
         'friendRequests' :[],
         'friends' : [],
         'message' :[]
       
       },
     ])
   );
  } 
 

 
function register(){
    let userNameINPUT = document.getElementById("userName").value;
    let emailINPUT = document.getElementById("email").value;
    let passwordINPUT = document.getElementById("password").value;
    let verifyPasswordINPUT = document.getElementById("verifyPassword").value;
   
    company. register(userNameINPUT, emailINPUT, passwordINPUT, verifyPasswordINPUT); 
    location.reload();
   
    }

function login(){
  let userNameOFlogin = document.getElementById("userNameOFlogin").value;
  let passwordOFlogin = document.getElementById("passwordOFlogin").value;    
 
  company.login(userNameOFlogin, passwordOFlogin,DOM1);
  

}

let sendRegister = document.getElementById("sendRegister");
sendRegister.addEventListener("click", register);
let sendLogin = document.getElementById("sendLogin");
sendLogin.addEventListener("click", login);


function DOM1(employee){
  
    containerA1.innerHTML = `<h2>Hello ${employee.userName}! </br> wallcome to "work in sales"</h2>  `;
    containerB.innerHTML = `<br><br>
                            <button id="stertTOwork">Start to work</button>
                            <button id="personal"> Personal area</button><br>
                            <button id='network'>Social-Network</button>
                          
                            `;
    containerA2.innerHTML ='';
  
    let buttonTOstartWork = document.getElementById("stertTOwork");
    buttonTOstartWork.addEventListener("click", () => {
        DOM2(employee);
        workspace.startTOwork(employee);      
        displayHtml.products(containerA2);
        displayHtml.customers(containerA2);
     });
  
    let buttonTOpersonal = document.getElementById("personal");
    buttonTOpersonal.addEventListener("click", () => {
        containerA2.innerHTML = '';
        containerA1.innerHTML ='';
        containerB.innerHTML = '';
        displayHtml.personalArea(containerA1,containerA2,employee);
            
         let buttonTOcomeback = document.createElement('button');
              buttonTOcomeback.innerText = "Home";
              buttonTOcomeback.addEventListener('click', () => {
                       
                 DOM1(employee);
              });  
         let buttonToMessage = document.createElement('button');
             buttonToMessage.innerText ='Message';
             buttonToMessage.addEventListener('click',() =>{
              containerA2.innerHTML ='';
                 displayHtml.message(containerA2,employee)
            });

         let buttonToGraph = document.createElement("button");
             buttonToGraph.innerText = "Show graph";
             buttonToGraph.addEventListener("click", () => {
              containerA2.innerHTML = `<div> <p style='color:red''>Salary</p>
                                             <p style='color:blue'>Amount hours</p> 
                                             <p style='color:green'>AmonutSalse</p></div> 
                                        <canvas id="myChart" style="width:40%"></canvas>`;
              displayHtml.displayGraph(employee.businessDays);
            });
        
         let buttonToSearchByDate = document.createElement("button");
             buttonToSearchByDate.innerText = "Search by date";
         let inputToDate = document.createElement("input");
             inputToDate.setAttribute('type', 'date');
             buttonToSearchByDate.addEventListener("click", () => {
                let yearFromeInput = Number(inputToDate.value[0] + inputToDate.value[1] + inputToDate.value[2] + inputToDate.value[3]); 
                let monthFromeInput = Number(inputToDate.value[5] + inputToDate.value[6]);
                let dayFromeInput = Number(inputToDate.value[8] + inputToDate.value[9]);
                   employee.businessDays.forEach((workDay) => {                     
                     if (
                       workDay.date.year == yearFromeInput &&
                       workDay.date.month + 1 == monthFromeInput &&
                       workDay.date.day == dayFromeInput
                     ) {
                      containerA2.innerHTML ='';
                      displayHtml.reportDaily(containerA2,workDay)
                     }
                   });
             });
              
        containerB.appendChild(buttonTOcomeback);
        containerB.appendChild(buttonToMessage);
        containerB.appendChild(buttonToGraph);
     
        containerB.appendChild(buttonToSearchByDate);
        containerB.appendChild(inputToDate);
  });

   let buttonToNetwork = document.getElementById('network');
   buttonToNetwork.addEventListener('click',() => {
    containerA1.innerHTML ='';
    containerA2.innerHTML='';
     social_network.displayUsers(containerA1,employee);
     social_network.displayFriendRequest(containerA2,containerA1,employee);

   });
}

function DOM2(employee){ 
  containerA1.innerHTML = '';
  header.innerHTML += ` <div id ='timer'>
                             <h3>   <br>
                                <en id="hours" >00</en>
                                <en id="minute" >00</en>
                                <en id="seconds" >00</en>
                             </h3> <br></>
                           </div>`;
  containerB.innerHTML = `  <button id="stop" > Stop to work</button>
                            <button id="continue" > Continue</button>
                            <button id="finish" > Finish to work</button>
                            <button id="shop" > Start a sale</button>
                           `;

  let toFinish = document.getElementById("finish");
  toFinish.addEventListener("click", () => {
    header.innerHTML = "";
      
  });                                     
  
   let startToSale = document.getElementById('shop');
   startToSale.addEventListener('click',() => {
     containerA1.innerHTML += `<div><input id='inputFORproduct' placeholder='Enter a protuct ID number'><br>
                               <input id='inputFORcustomer' placeholder='Enter a customer ID number'><br><br>
                               <button id='makeSale'> Make a sale </button></div>`; 

                 
     let makeSale = document.getElementById("makeSale");
     makeSale.addEventListener("click", () => {
         workspace.toSale(employee);
       
         });
   });
  callToDom1(employee);
} 
    
function callToDom1(employee){
  let buttonTOchangeDOMwhenFinish = document.getElementById("finish");
  buttonTOchangeDOMwhenFinish.addEventListener("click", () => {
  DOM1(employee);
});
}
