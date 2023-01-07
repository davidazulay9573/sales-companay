import Company from "./company.js";
import DisplayTOHTML from "./displayHtml.js";
const company = new Company();
const displayHtml = new DisplayTOHTML();


if (company.productsFromeLocalStorge == null) {
  localStorage.setItem("products", JSON.stringify([{'name':'example'}]));
}
if (company.customersFromeLocalStorge == null) {
  localStorage.setItem("customers", JSON.stringify([{ 'name': "example" }]));
}

if (company.DailyReportFromeLocalStorge == null) {
  localStorage.setItem("daily", JSON.stringify([{ name: "example" }]));
}

if (company.employeeFromeLocalStorge == null) {
  localStorage.setItem(
    "employees",
    JSON.stringify([
      {
        userName: "example",
        email: "@",
        password: "11",
        rating: 0,

        businessDays: [],
        productsSold: [],
        friendRequests: [],
        friends: [],
        message: [],
      },
    ])
  );
} 
 
const containerA1 = document.getElementById("containerA1");
const containerA2 = document.getElementById("containerA2");
const containerB = document.getElementById("containerB");

let addProduct = document.getElementById("addProduct");
addProduct.addEventListener("click", () => {
  let nameOfProduct = document.getElementById("nameOfProduct").value;
  let typeOfProduct = document.getElementById("typeOfProduct").value;
  let priceOfProduct = document.getElementById("priceOfProduct").value;
  let IdOfProudt = document.getElementById("IdOfProudt").value;

  if (nameOfProduct != "" && typeOfProduct != "" && priceOfProduct != "" && IdOfProudt != "") {
    company.addProduct(nameOfProduct, typeOfProduct, priceOfProduct,IdOfProudt);
     location.reload();
  }
});

let addCustomers = document.getElementById("addCustomers");
addCustomers.addEventListener("click", () => {
  let nameOfCustomers = document.getElementById("nameOfCustomer").value;
  let typeOfCustomers = document.getElementById("typeOfCustomer").value;
  let phoneNumber = document.getElementById("phoneNumber ").value;
  let IdOfCustomers = document.getElementById("IdOfCustomer").value;

  if ( nameOfCustomers != "" && typeOfCustomers != "" && phoneNumber  != "" && IdOfCustomers != "" ) {
    company.addCustomer(nameOfCustomers, typeOfCustomers, phoneNumber,IdOfCustomers);
     location.reload();
  }
});

let showPordact = document.getElementById("showPordact");
showPordact.addEventListener("click", () => {
  containerA2.innerHTML ='';
  displayHtml.products(containerA2)
  
});

let showCusromer = document.getElementById("showCustomer");
showCusromer.addEventListener("click", () => {
   containerA2.innerHTML = "";
  displayHtml.customers(containerA2)
});

let showGraph = document.getElementById("showGraph");
showGraph.addEventListener('click',( )=> {
   containerA1.innerHTML = `
                        <div>  <canvas id="myChart" style="width:40%" "></canvas><br>
                        <p style='color:red''>Salary</p>
                        <p style='color:blue'>Amount hours</p>  
                        <p style='color:green'>AmonutSalse</p></div>
                          
`;
   displayHtml.displayGraph(company.DailyReportFromeLocalStorge);
});

let inputToDate = document.getElementById("inputToDate"); ; 
let searchByDate = document.getElementById("searchByDate");
searchByDate.addEventListener("click", () => {
 if(inputToDate.value != '') {
  containerA2.innerHTML ='';
   let yearFromeInput = Number(inputToDate.value[0] + inputToDate.value[1] + inputToDate.value[2] + inputToDate.value[3]); 
   let monthFromeInput = Number(inputToDate.value[5] + inputToDate.value[6]);
   let dayFromeInput = Number(inputToDate.value[8] + inputToDate.value[9]);
   company.findeDataByDate(containerA2, yearFromeInput,monthFromeInput,dayFromeInput);
 }
  
});

let inputToName = document.getElementById("inputToName");
let searchByName = document.getElementById("searchByName");
searchByName.addEventListener("click", () => {
   containerA2.innerHTML = "";
  company.findeDataByName(containerA2, inputToName.value);
   
});
company.calculateAllData();
company.printDataSummaryToHTML(containerB,containerA2);
