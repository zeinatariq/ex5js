function getStudent(studentId) {
    let student = { id: studentId };

    registerInputs.forEach(function (input) {
        let key = input.name,
            value = input.value;
        student[key] = value;
    });

    return student;
}


function addStudent(student) {
    console.log(student);
}


function validateStudent(student) {
    let isValid = true;

    for (let field in student) {
        if (field === "id") continue; 

        let inputName = field,
            inputValue = student[field];

        if (regexInputs[inputName] && !regexInputs[inputName].test(inputValue)) {
            isValid = false;
        }
    }

    return isValid;
}


function showStudent(student) {
    tableBody.innerHTML += `
        <tr>
            <td>${student.id}</td>
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.email}</td>
            <td>${student.age}</td>
            <td>${student.phone}</td>
            <td>
                <div class="buttons">
                    <button class="btn btn-info text-light me-2">Edit</button>
                    <button class="btn btn-danger text-light">Delete</button>
                </div>
            </td>
        </tr>
    `;
}


function checkInput(input) {
    let inputName = input.name,
        inputValue = input.value,
        isEmpty = inputValue === "",
        errorEle = document.querySelector(`p.alert[dta-error-name="${inputName}"]`),
        isInvalid = !regexInputs[inputName].test(inputValue),
        errorMsg = "";

    if (isEmpty) {
        errorMsg = "This field is required.";
    } else if (isInvalid) {
        errorMsg = "Invalid field.";
    }

    if (isEmpty || isInvalid) {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        errorEle.textContent = errorMsg;
        errorEle.classList.remove('d-none');
    } else {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        errorEle.classList.add('d-none');
    }
}