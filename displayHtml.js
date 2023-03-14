export default class DisplayTOHTML {
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
  }

  objectsList(div, array, name, string) {
    let divOfObjectsList = document.createElement("div");
    let ul = document.createElement("ul");
    ul.innerHTML += `<h2> name: ${name} list:</h2>`;

    array.forEach((element) => {
      let li = document.createElement("div");
      let newDIV = document.createElement("button");
      newDIV.setAttribute("class", "buttons2");
      newDIV.innerHTML = `${element.name} <b>Click</b>`;
      newDIV.addEventListener("click", () => {
        newDIV.style.width = "140px";
        newDIV.style.height = "100px";

        let newButtonToRemove = document.createElement("button");
        newButtonToRemove.setAttribute("class", "buttons3");
        newButtonToRemove.innerHTML = `Remove`;
        newButtonToRemove.addEventListener("click", () => {
          li.innerHTML = "";
          let indexOfelement = array.indexOf(element);
          array.splice(indexOfelement, 1);
          localStorage.setItem(name, JSON.stringify(array));
        });

        newDIV.innerHTML = `<br> name :  ${element.name}<br>
                               ${string}:  ${element.dataNumbers}<br>
                                ID :  ${element.id} <br>`;
        newDIV.appendChild(newButtonToRemove);
      });

      li.appendChild(newDIV);
      ul.appendChild(li);
    });

    divOfObjectsList.appendChild(ul);
    div.appendChild(divOfObjectsList);
  }
  products(div) {
    this.objectsList(div, this.productsFromeLocalStorge, "products", "Price");
  }

  customers(div) {
    this.objectsList(
      div,
      this.customersFromeLocalStorge,
      "customers",
      "Phon number"
    );
  }

  message(div, employee) {
    employee.message.forEach((message) => {
      div.innerHTML += `${message}<br>`;
    });
  }

  personalArea(div, div2, employee) {
    let totalHours = 0;
    let totalSalary = 0;
    let totalSales = 0;

    employee.businessDays.forEach((workDay) => {
      totalSalary += workDay.salary;
      totalHours += workDay.workhours;
      totalSales += workDay.amountSales;
    });
    let divOfcontent = document.createElement("div");
    divOfcontent.setAttribute("class", "divOfPersonal");
    divOfcontent.innerHTML = `<div ><h3> User name:  ${
      employee.userName
    }<br><br>
     Amount sales: ${totalSales} <br><br>
     Rating: ${employee.rating} <br><br>
     Total profit:  ${totalSalary} <br><br>
     Total working days: ${employee.businessDays.length}<br><br>
     Total working hours:${totalHours} <br><br>
     Hourly profit: ${totalSalary / totalHours} <br><br>
     Daily profit: ${
       totalSalary / employee.businessDays.length
     }</h3><br> <br><br> `;

    let buttonDaysList = document.createElement("button");
    buttonDaysList.innerText = " Show days list";
    buttonDaysList.addEventListener("click", () => {
      div2.innerHTML = "";
      let ul = document.createElement("ul");
      ul.innerHTML += `<h3> Work days list:</h3>`;
      employee.businessDays.forEach((workDay) => {
        let li = document.createElement("div");
        this.reportDaily(li, workDay);
        ul.appendChild(li);
      });
      div2.appendChild(ul);
    });

    divOfcontent.appendChild(buttonDaysList);
    div.appendChild(divOfcontent);
  }
  reportDaily(div, workDay) {
    div.innerHTML += `<h4>Date: ${workDay.date.day}-${workDay.date.month + 1}-${
      workDay.date.year
    };<br>
                              Salary: ${workDay.salary};<br>
                              Work hours: ${workDay.workhours};<br>
                              Amount sales: ${
                                workDay.amountSales
                              }.</h4><br></br></div>`;
  }

  displayGraph(array) {
    let date = array.map(
      (workDay) => workDay.date.day + "/" + (workDay.date.month + 1)
    );
    let arrayOfSalary = array.map((workDay) => workDay.salary);
    let arrayOfSales = array.map((workDay) => workDay.amountSales);
    let arrayOfHours = array.map((workDay) => workDay.workhours);

    new Chart("myChart", {
      type: "line",
      data: {
        labels: date,
        datasets: [
          {
            data: arrayOfSalary,
            borderColor: "red",
            fill: false,
          },
          {
            data: arrayOfSales,
            borderColor: "green",
            fill: false,
          },
          {
            data: arrayOfHours,
            borderColor: "blue",
            fill: false,
          },
        ],
      },
      options: {
        legend: { display: false },
      },
    });
  }
}
