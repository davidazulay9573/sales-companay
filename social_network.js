export default class Social_network {
  employeeFromeLocalStorge;
  constructor() {
    this.employeeFromeLocalStorge = JSON.parse(
      localStorage.getItem("employees")
    );
  }

  displayUsers(div, employee) {
     div.innerHTML ='';
    let divOfAllEmployees = document.createElement("div");
    let ul = document.createElement("ul");
    ul.innerHTML += `<h2>Employees list:</h2>`;

    this.employeeFromeLocalStorge.forEach((employeeLS, indexLS) => {
      if (employeeLS.userName != employee.userName) {
        let li = document.createElement("div");
        let divOfEmployee = document.createElement("button");
        divOfEmployee.setAttribute("class", "divEmployees");
        divOfEmployee.innerHTML = `Employee:${employeeLS.userName} <b>Click</b>`;

        let namesOfFriends = employee.friends.map((friend) => friend.userName);
        let checkIfFriends = namesOfFriends.includes(employeeLS.userName);
        if (checkIfFriends == true) {
          divOfEmployee.style.backgroundColor = "rgba(0, 100, 0, 0.421)";
        }
        divOfEmployee.addEventListener("mousemove", () => {
          divOfEmployee.style.width = "200px";
          divOfEmployee.style.height = "90px";

          divOfEmployee.innerHTML = ` <b>Click</b> <br>name: ${employeeLS.userName} <br>
                                       Rating:${employeeLS.rating}<br><br>`;
        });
        divOfEmployee.addEventListener("click", () => {
          if (checkIfFriends == true) {
            this.sendMessage(li, employee, employeeLS, indexLS);
          } else {
            this.askForMembership(li, employee, employeeLS, indexLS);
          }
        });
        li.appendChild(divOfEmployee);
        ul.appendChild(li);
      }
    });

    divOfAllEmployees.appendChild(ul);
    div.appendChild(divOfAllEmployees);
  }

  askForMembership(div, employee, employeeLS, indexLS) {
    div.innerHTML = `Ask to be a friend of ${employeeLS.userName}!!`;
    let newButtonToAskFriendship = document.createElement("button");
    newButtonToAskFriendship.setAttribute("class", "buttons3");
    newButtonToAskFriendship.innerHTML = `friend request`;
    newButtonToAskFriendship.addEventListener("click", () => {
      div.innerHTML = "Request sent successfully!";
      employeeLS.friendRequests.push(employee);
      this.employeeFromeLocalStorge.splice(indexLS, 1);
      this.employeeFromeLocalStorge.push(employeeLS);
      localStorage.setItem(
        "employees",
        JSON.stringify(this.employeeFromeLocalStorge)
      );
    });
    div.appendChild(newButtonToAskFriendship);
  }

  sendMessage(div, employee, employeeLS, indexLS) {
    div.innerHTML = `Send ${employeeLS.userName}  a message !!`;
    let newinputForMessage = document.createElement("input");
    newinputForMessage.setAttribute("type", "message");
    newinputForMessage.setAttribute("placeholder", "Message");

    let newButtonToSendMessage = document.createElement("button");
    newButtonToSendMessage.setAttribute("class", "buttons4");
    newButtonToSendMessage.innerHTML = `Send message`;
    newButtonToSendMessage.addEventListener("click", () => {
      employeeLS.message.push(
        `Frome: ${employee.userName} Message:${newinputForMessage.value} `
      );
      this.employeeFromeLocalStorge.splice(indexLS, 1);
      this.employeeFromeLocalStorge.push(employeeLS);
      localStorage.setItem(
        "employees",
        JSON.stringify(this.employeeFromeLocalStorge)
      );
    });
    div.appendChild(newinputForMessage);
    div.appendChild(newButtonToSendMessage);
  }

  displayFriendRequest(div,div2, employee) {
    let ul = document.createElement("ul");
    if (ul.value != "") {
      ul.innerHTML += `<h2>You have a friend requests from </h2>`;
    }
    this.employeeFromeLocalStorge.forEach((employeeLS) => {
      employee.friendRequests.forEach((employeeRT) => {
        if (employeeLS.userName == employeeRT.userName) {
          let li = document.createElement("div");
          let newDIV = document.createElement("div");
          newDIV.innerHTML = ` <h2>Friends request</h2> <br> 
                            name:${employeeRT.userName}`;
          let newbuttonToConfirm = document.createElement("button");
          newbuttonToConfirm.innerText = "Confirm";
          newbuttonToConfirm.addEventListener("click", () => {
             this.confirmFriendly(employee, employeeRT, employeeLS, li, div2);
          });

          let newbuttonToRejected = document.createElement("button");
          newbuttonToRejected.innerText = "Rejected";
          newbuttonToRejected.addEventListener("click", () => {
            this.rejectedFriendly(employee, employeeRT, li);

          });
          newDIV.appendChild(newbuttonToConfirm);
          newDIV.appendChild(newbuttonToRejected);
          li.appendChild(newDIV);
          ul.appendChild(li);
        }
      });
    });
    div.appendChild(ul);
  }
  confirmFriendly(employee,employeeRT,employeeLS,li,div){
      employee.friendRequests = employee.friendRequests.filter(checkRQST);
      function checkRQST(friend) {
        return friend.userName != employeeRT.userName;
      }

      employee.friends.push(employeeRT);
      employeeLS.friends.push(employee);

      let filterOfEmployeeArray =
        this.employeeFromeLocalStorge.filter(checkEMPL);
      function checkEMPL(employeeFR) {
        return (
          employeeFR.userName != employeeLS.userName &&
          employeeFR.userName != employee.userName
        );
      }

      filterOfEmployeeArray.push(employeeLS);
      filterOfEmployeeArray.push(employee);
      localStorage.setItem("employees", JSON.stringify(filterOfEmployeeArray));
      li.innerHTML = "";
      this.displayUsers(div, employee);
  }
  rejectedFriendly(employee,employeeRT,li){
      li.innerHTML = "";
      employee.friendRequests = employee.friendRequests.filter(checkRQST);
      function checkRQST(friend) {
        return friend.userName != employeeRT.userName;
      }

      let filterOfEmployeeArray =
        this.employeeFromeLocalStorge.filter(checkEMPL);
      function checkEMPL(employeeFR) {
        return employeeFR.userName != employee.userName;
      }

      filterOfEmployeeArray.push(employee);
      localStorage.setItem("employees", JSON.stringify(filterOfEmployeeArray));
  }
}
