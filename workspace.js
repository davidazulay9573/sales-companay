import Company from "./company.js";
import { WorkDay } from "./workday.js";
// import MakeSale from "./make_ a_sale.js";

let company = new Company();
// let makeSale = new MakeSale();
export default class Workspace {
  employeeFromeLocalStorge;
  productsFromeLocalStorge;
  customersFromeLocalStorge;
  #timeWork;
  #salaryToday;
  #salesToday;
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

    this.#timeWork = 0;
    this.#salaryToday = 0;
    this.#salesToday = 0;
  }
  startTOwork(employee) {
    this.#salaryToday = 0;

    let showSeconds = 0;
    let showMinutes = 0;
    let showHour = 0;

    function addOneToTimer() {
      let divOFseconds = document.getElementById("seconds");
      let divOFminute = document.getElementById("minute");
      let divOFhour = document.getElementById("hours");

      if (Stop == 0) {
      } else {
        showSeconds += 1;
        divOFseconds.innerText = ":" + showSeconds;

        if (showSeconds == 60) {
          showSeconds = 0;
          showMinutes += 1;

          divOFseconds.innerText = "00";
          divOFminute.innerText = ":" + showMinutes;

          if (showMinutes == 60) {
            showMinutes = 0;
            showHour += 1;
            divOFminute.innerText = "00";
            divOFhour.innerHTML = showHour;
          }
        }
      }
    }
    let day = 60000 * 60 * 24;
    let i = 0;
    let Stop = 0;

    function loopOFtimer() {
      Stop += 1;

      while (i < day) {
        setTimeout(addOneToTimer, i);
        i += 1000;
      }
    }

    function stopLop() {
      Stop = 0;
    }
    loopOFtimer();

    let continueTOwork = document.getElementById("continue");
    continueTOwork.addEventListener("click", loopOFtimer);

    let stop = document.getElementById("stop");
    stop.addEventListener("click", stopLop);

    let finish = document.getElementById("finish");
    finish.addEventListener("click", () => {
      Stop = 0;
      let minutes = (showMinutes * 10) / 60;
      this.#timeWork = showHour + minutes * 0.1;

      if (this.#salaryToday / this.#timeWork < 35) {
        this.#salaryToday = 35 * this.#timeWork;
      }

      this.finishTOwork(employee);
    });
  }

  finishTOwork(employee) {
    let date = new Date();
    let dateOBJ = {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      dayWeekly: date.getDay(),
    };

    let newDay = new WorkDay(
      dateOBJ,
      this.#timeWork,
      this.#salaryToday,
      this.#salesToday
    );

    if (employee.businessDays.length >= 1) {
      let checkDate = employee.businessDays.every(check);
      function check(workDay) {
        return workDay.date.day != dateOBJ.day;
      }
      if (checkDate) {
        employee.businessDays.push(newDay);
      } else {
        employee.businessDays.forEach((workDay) => {
          if (workDay.date.day == dateOBJ.day) {
            workDay.workhours += this.#timeWork;
            workDay.salary += this.#salaryToday;
            workDay.amountSales += newDay.amountSales;
          }
        });
      }
    } else {
      employee.businessDays.push(newDay);
    }

    let filterOfEmployeeArray = this.employeeFromeLocalStorge.filter(check);
    function check(employeeFR) {
      return employeeFR.userName != employee.userName;
    }

    company.keepInLocalStorge(filterOfEmployeeArray, employee, "employees");
  }

  toSale(employee) {
    let inputFORproduct = document.getElementById("inputFORproduct").value;
    let inputFORcustomers = document.getElementById("inputFORcustomer").value;

    this.customersFromeLocalStorge.forEach((customer) => {
      this.productsFromeLocalStorge.forEach((product, index) => {
        if (inputFORproduct == product.id && inputFORcustomers == customer.id) {
          console.log(employee);
          employee.productsSold.push(product);
          customer.products.push(product);
          this.#salaryToday += Number(product.dataNumbers * 0.15);
          this.#salesToday += 1;
          employee.rating += 2;
          employee.rating += Number(product.dataNumbers * 0.01);

          this.productsFromeLocalStorge.splice(index, 1);

          localStorage.setItem(
            "products",
            JSON.stringify(this.productsFromeLocalStorge)
          );
          localStorage.setItem(
            "customers",
            JSON.stringify(this.customersFromeLocalStorge)
          );
          alert("The sale was successful");
        }
      });
    });
  }
}
