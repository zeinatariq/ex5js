let registerForm = document.querySelector("#Register form");
let registerInputs = registerForm.querySelectorAll("input");
let students = [];
let id = 0;
let tableBody = document.querySelector("#Data tbody");

let regexInputs = {
    firstName: /^[A-Za-z]+$/,
    lastName: /^[A-Za-z]+$/,
    email: /^[A-Za-z][A-Za-z_0-9\.]+@(gmail|yahoo)\.(com|org)$/,
    age: /^[0-9]{2}$/,
    phone: /^(02)?01(0|1|2|5)[0-9]{8}$/,
};



registerForm.addEventListener("submit", function (e) {
    e.preventDefault();


    let focusInput = registerForm.querySelector("input:focus");
    focusInput?.blur();

    let inValidInput = document.querySelector("input.is-invalid");
    if (inValidInput !== null) {
        return;

    }
    let student = getStudent(++id);

    
    if (!validateStudent(student)) {
        id--; 
        return;
    }

    students.push(student);
    console.log(students);

    addStudent(student);
    showStudent(student);

    this.reset();
});