let staff = [];

function addStaff() {
  const name = document.getElementById("name").value;
  staff.push(name);
  renderStaff();
}

function deleteStaff(index) {
  staff.splice(index, 1);
  renderStaff();
}

function editStaff(index) {
  const newName = prompt("Enter new name:");
  if (newName) {
    staff[index] = newName;
    renderStaff();
  }
}

function renderStaff() {
  const list = document.getElementById("staffList");
  list.innerHTML = "";

  staff.forEach((s, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${s} 
      <button onclick="deleteStaff(${index})">Delete</button>
      <button onclick="editStaff(${index})">Edit</button>`;
    list.appendChild(li);
  });
}
