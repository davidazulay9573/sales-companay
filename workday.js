export class WorkDay{
    constructor(date,workhours,salary,sales){
        this.date = date;
        this.workhours = workhours;
        this.salary = salary;
        this.amountSales =sales;

    }
}

export class Work_Day_of_all extends WorkDay {
  constructor(date, workhours, salary, sales) {
    super(date,workhours,salary,sales);
    this.allDays = [];

  }
  calculateAllDayse() {
    
         this.workhours = 0;
         this.salary = 0;
         this.amountSales = 0;

     this.allDays.forEach((workDay) => {
     this.workhours += workDay.workhours;
     this.salary += workDay.salary;
     this.amountSales += workDay.amountSales;
    });
  }
}