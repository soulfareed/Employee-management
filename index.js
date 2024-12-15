function showPage(page) {
  if (page === "register") {
    document.getElementById("content").innerHTML = `
            <div class="form-container">
                <h2>Register Employee</h2>
                <input type="text" id="name" placeholder="Name" required>
                <input type="text" id="position" placeholder="Position" required>
                <textarea id="about" placeholder="About" required></textarea>
                <input type="date" id="joining_date" required>
                <button onclick="registerEmployee()">Submit</button>
            </div>
        `;
  } else if (page === "list") {
    displayEmployeeList();
  }
}

function registerEmployee() {
  const employee = {
    name: document.getElementById("name").value,
    position: document.getElementById("position").value,
    about: document.getElementById("about").value,
    joining_date: document.getElementById("joining_date").value,
  };
  const employees = JSON.parse(localStorage.getItem("employees")) || [];
  employees.push(employee);
  localStorage.setItem("employees", JSON.stringify(employees));
  showPage("list");
}

function displayEmployeeList() {
  const employees = JSON.parse(localStorage.getItem("employees")) || [];
  const tableRows = employees
    .map(
      (employee, index) => `
        <tr>
            <td>${employee.name}</td>
            <td>${employee.position}</td>
            <td>${employee.about}</td>
            <td>${employee.joining_date}</td>
            <td><button onclick="deleteEmployee(${index})">Delete</button></td>
        </tr>
    `
    )
    .join("");
  document.getElementById("content").innerHTML = `
        <div class="table-container">
            <h2>Employee List</h2>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>About</th>
                    <th>Joining Date</th>
                    <th>Action</th>
                </tr>
                ${tableRows}
            </table>
        </div>
    `;
}

function deleteEmployee(index) {
  const employees = JSON.parse(localStorage.getItem("employees")) || [];
  employees.splice(index, 1);
  localStorage.setItem("employees", JSON.stringify(employees));
  displayEmployeeList();
}

document.getElementById("search").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  const employees = JSON.parse(localStorage.getItem("employees")) || [];
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm)
  );
  document.getElementById("content").innerHTML = filteredEmployees
    .map(
      (emp) => `
        <div>${emp.name} - ${emp.position}</div>
    `
    )
    .join("");
});

showPage("list");
