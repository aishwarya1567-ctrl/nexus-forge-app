function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username && password) {
    alert("Login Successful");
  } else {
    alert("Please enter credentials");
  }
}

let staff = [];

function addStaff() {
  const name = document.getElementById("staffName").value;
  if (!name) return;

  staff.push(name);
  renderStaff();
}

function renderStaff() {
  const list = document.getElementById("staffList");
  list.innerHTML = "";

  staff.forEach((s, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${s} <button onclick="deleteStaff(${index})">Delete</button>`;
    list.appendChild(li);
  });
}

function deleteStaff(index) {
  staff.splice(index, 1);
  renderStaff();
}
