import Product from "./product.js";
import Client from "./client.js";
import Employee from "./employee.js";
import DisplayTOHTML from "./displayHtml.js";
import { Work_Day_of_all } from "./workday.js";

let displayHtml = new DisplayTOHTML();
export default class Company {
  employeeFromeLocalStorge;
  productsFromeLocalStorge;
  customersFromeLocalStorge;
  DailyReportFromeLocalStorge;

  #totalSalary;
  #totalHours;
  #totalProfit;
  #totalSales;

  constructor() {
    this.employeeFromeLocalStorge = JSON.parse(
      localStorage.getItem("employees")
    );
    this.productsFromeLocalStorge = JSON.parse(
      localStorage.getItem("products")
    );
    this.customersFromeLocalStorge = JSON.parse(
      localStorage.getItem("customers")
    );
    this.DailyReportFromeLocalStorge = JSON.parse(
      localStorage.getItem("daily")
    );

    this.#totalSalary = 0;
    this.#totalHours = 0;
    this.#totalProfit = 0;
    this.#totalSales = 0;
    this.productsSold = [];
  }
  register(userNameINPUT, emailINPUT, passwordINPUT, verifyPasswordINPUT) {
    let chekEmployeeList = 0;
    this.employeeFromeLocalStorge.forEach((element) => {
      if (userNameINPUT == element.userName || emailINPUT == element.email) {
        chekEmployeeList = 1;
        alert("שם המשתמש או האימייל קיימים במערכת");
      }
    });

    if (chekEmployeeList != 1) {
      if (
        userNameINPUT != "" &&
        emailINPUT != "" &&
        passwordINPUT != "" &&
        verifyPasswordINPUT != ""
      ) {
        if (passwordINPUT == verifyPasswordINPUT) {
          let employee = new Employee(userNameINPUT, emailINPUT, passwordINPUT);
          this.employeeFromeLocalStorge =
            this.employeeFromeLocalStorge.filter(checkEMPL);
          function checkEMPL(EMPL) {
            return EMPL.userName != "example";
          }
          this.keepInLocalStorge(
            this.employeeFromeLocalStorge,
            employee,
            "employees"
          );
        }
      }
    }
  }

  login(userNameOFlogin, passwordOFlogin, funcForDOM) {
    this.employeeFromeLocalStorge.forEach((employee) => {
      if (
        userNameOFlogin == employee.userName &&
        passwordOFlogin == employee.password
      ) {
        funcForDOM(employee);
      }
    });
  }

  addProduct(nameOfProduct, typeOfProduct, priceOfProduct, IdOfProudt) {
    this.productsFromeLocalStorge = this.productsFromeLocalStorge.filter(check);
    function check(PT) {
      return PT.name != "example";
    }
    let product = new Product(
      nameOfProduct,
      typeOfProduct,
      priceOfProduct,
      IdOfProudt
    );

    this.keepInLocalStorge(this.productsFromeLocalStorge, product, "products");
  }

  addCustomer(nameOfCustomer, typeOfCustomer, phoneNumber, IdOfCustomer) {
    let client = new Client(
      nameOfCustomer,
      typeOfCustomer,
      phoneNumber,
      IdOfCustomer
    );
    this.customersFromeLocalStorge =
      this.customersFromeLocalStorge.filter(check);
    function check(CR) {
      return CR.name != "example";
    }
    this.keepInLocalStorge(this.customersFromeLocalStorge, client, "customers");
  }

  keepInLocalStorge(array, element, LSname) {
    array.push(element);
    localStorage.setItem(LSname, JSON.stringify(array));
  }
  dailyReport() {
    let date = new Date();
    let dateOBJ = {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      dayWeekly: date.getDay(),
    };
    let newDayOfALL = new Work_Day_of_all(dateOBJ);
    this.employeeFromeLocalStorge.forEach((employee) => {
      employee.businessDays.forEach((workDay) => {
        if (workDay.date.day == dateOBJ.day) {
          newDayOfALL.allDays.push(workDay);
          newDayOfALL.calculateAllDayse();
        }
      });
    });

    this.DailyReportFromeLocalStorge.forEach((dayRPT, index) => {
      if (dayRPT.name == "example") {
        this.DailyReportFromeLocalStorge.splice(index, 1);
      }
    });

    if (this.DailyReportFromeLocalStorge.length >= 1) {
      let checkDate = this.DailyReportFromeLocalStorge.every((workDay) => {
        return workDay.date.day != dateOBJ.day;
      });

      if (checkDate) {
        this.DailyReportFromeLocalStorge.push(newDayOfALL);
      } else {
        this.DailyReportFromeLocalStorge.forEach((dayRPT) => {
          if (dayRPT.date.day == dateOBJ.day) {
            dayRPT.workhours = newDayOfALL.workhours;
            dayRPT.salary = newDayOfALL.salary;
            dayRPT.amountSales = newDayOfALL.amountSales;
          }
        });
      }
    } else {
      this.DailyReportFromeLocalStorge.push(newDayOfALL);
    }
    localStorage.setItem(
      "daily",
      JSON.stringify(this.DailyReportFromeLocalStorge)
    );
  }

  calculateAllData() {
    this.#totalProfit = 0;
    this.#totalHours = 0;
    this.#totalSalary = 0;
    let totalRevenues = 0;
    this.dailyReport();
    this.DailyReportFromeLocalStorge.forEach((day) => {
      this.#totalHours += day.workhours;
      this.#totalSalary += day.salary;
      this.#totalSales += day.amountSales;
    });

    this.employeeFromeLocalStorge.forEach((employee) => {
      employee.productsSold.forEach((product) => {
        this.productsSold.push(product);
      });
    });

    this.productsSold.forEach((product) => {
      totalRevenues += Number(product.dataNumbers);
    });
    this.#totalProfit += totalRevenues - this.#totalSalary;
  }

  printDataSummaryToHTML(div, div2) {
    div.innerHTML = `<br><h4>
                    total employees: ${
                      this.employeeFromeLocalStorge.length
                    }<br><br>
                    total working hours: ${this.#totalHours} <br><br>
                    Total payment of salaries: ${this.#totalSalary} <br><br>
                    Total sales: ${this.#totalSales} <br><br>
                    Total profit: ${this.#totalProfit}  </h4>`;

    let buttonDaysList = document.createElement("button");
    buttonDaysList.innerText = " Show days list";
    buttonDaysList.addEventListener("click", () => {
      div2.innerHTML = "";
      let ul = document.createElement("ul");
      this.DailyReportFromeLocalStorge.forEach((workDay) => {
        let li = document.createElement("div");
        displayHtml.reportDaily(li, workDay);
        ul.appendChild(li);
      });

      div2.appendChild(ul);
    });
    div.appendChild(buttonDaysList);
  }

  findeDataByDate(div, yearFromeInput, monthFromeInput, dayFromeInput) {
    let ul = document.createElement("ul");
    this.employeeFromeLocalStorge.forEach((employee) => {
      let li = document.createElement("li");
      li.innerHTML += `<h2>Employee name: ${employee.userName}</h2>`;
      employee.businessDays.forEach((workDay) => {
        if (
          workDay.date.year == yearFromeInput &&
          workDay.date.month + 1 == monthFromeInput &&
          workDay.date.day == dayFromeInput
        ) {
          displayHtml.reportDaily(li, workDay);
        }
      });
      ul.appendChild(li);
      div.appendChild(ul);
    });
  }

  findeDataByName(div, inputToName) {
    this.employeeFromeLocalStorge.forEach((employee) => {
      if (employee.userName == inputToName) {
        displayHtml.personalArea(div, div, employee);
      }
    });
  }
}
