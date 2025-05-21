// DOM elements---
const form = document.querySelector('form');
const nameInput = document.getElementById('studentName');
const idInput = document.getElementById('studentId');
const emailInput = document.getElementById('email');
const contactInput = document.getElementById('contact');
const tableBody = document.getElementById('studentTableBody');

let students = JSON.parse(localStorage.getItem('students')) || [];
let editIndex = null;

// Load data from localStorage when the page loads---
window.onload = function () {
    displayStudents();
};

// Form submission handler---
form.addEventListener('submit', function (e) {
    e.preventDefault();


    const name = nameInput.value.trim();
    const id = idInput.value.trim();
    const email = emailInput.value.trim();
    const contact = contactInput.value.trim();

    // Validation---
    if (!name || !id || !email || !contact) {
        alert("Please fill in all fields.");
        return;
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
        alert("Student name must contain only letters.");
        return;
    }

    if (!/^\d+$/.test(id)) {
        alert("Student ID must be a number.");
        return;
    }

    if (!/^\d{10}$/.test(contact)) {
        alert("Contact number must be a 10-digit number.");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    const student = { name, id, email, contact };

    if (editIndex === null) {
        students.push(student);
    } else {
        students[editIndex] = student;
        editIndex = null;
    }

    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
    form.reset();
});

// Display all students in the table---
function displayStudents() {
    tableBody.innerHTML = "";

    students.forEach((student, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td class="actions">
                <button class="edit" onclick="editStudent(${index})">Edit</button>
                <button class="delete" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Edit a student---
function editStudent(index) {
    const student = students[index];
    nameInput.value = student.name;
    idInput.value = student.id;
    emailInput.value = student.email;
    contactInput.value = student.contact;
    editIndex = index;
}

// Delete a student---
function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents();
    }
}
