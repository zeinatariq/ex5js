function getStudent(studentId) {
    let student = { id: studentId };

    registerInputs.forEach(function (input) {
        let key = input.name,
            value = input.value;
        student[key] = value;
    });

    return student;
}

function addStudent() {
    let focusInput = registerForm.querySelector("input:focus"),
        invalidInput = registerForm.querySelector("input[data-valid='false']");

    focusInput?.blur();
    let invalidClassInput = registerForm.querySelector("input.is-invalid");

    if (invalidClassInput !== null || invalidInput !== null) {
        return;
    }

    let student = getStudent(++id);
    students.push(student);
    updateLocalstorage();
    refreshTable();
    resetForm();
}




function showStudent(student) {
    tableBody.insertAdjacentHTML('beforeend', `
        <tr data-student-id="${student.id}">
            <td>${student.id}</td>
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.email}</td>
            <td>${student.age}</td>
            <td>${student.phone}</td>
            <td>
                <div class="buttons">
                    <button class="btn btn-info text-light me-2" onclick="insertStudentIntoForm(${student.id})">Edit</button>
                    <button class="btn btn-danger text-light" onclick="deleteStudent(${student.id})">Delete</button>
                </div>
            </td>
        </tr>
    `);
}


function showStudents(data) {
    tableBody.innerHTML = `<tr>
        <td id="TableAlert" class="table-warning text-center" colspan="7">There are no data</td>
    </tr>`;
    data.forEach(function (student) {
        showStudent(student);
    });
    isNoData(data);
}

function checkInput(input) {
    let inputName = input.name,
        inputValue = input.value,
        isEmpty = inputValue === "",
        errorEle = document.querySelector(`p.alert[data-error-name="${inputName}"]`),
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
        if (errorEle) {
            errorEle.textContent = errorMsg;
            errorEle.classList.remove('d-none');
        }
        input.dataset.valid = false;
    } else {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        if (errorEle) {
            errorEle.classList.add('d-none');
        }
        input.dataset.valid = true;
    }
}

function resetForm() {
    registerForm.reset();
    registerInputs.forEach(function (input) {
        input.classList.remove('is-valid');
        input.classList.remove('is-invalid');
        input.dataset.valid = false;
        let errorEle = document.querySelector(`p.alert[data-error-name="${input.name}"]`);
        if (errorEle) {
            errorEle.classList.add('d-none');
        }
    });


    let formBtn = registerForm.querySelector("button");
    formBtn.textContent = "Add";
    formBtn.classList.remove('btn-info', 'text-light');
    formBtn.classList.add('btn-success');

    registerForm.setAttribute('data-type', 'add');
    delete registerForm.dataset.studentId;
}

function updateLocalstorage() {
    localStorage.setItem('students', JSON.stringify(students));
}

function getStudentIndex(id) {
    return students.findIndex((student) => student.id == id);
    
}

function deleteStudent(id) {
    if (!confirm("Are you sure?")) {
        return;
    }

    let studentIndex = getStudentIndex(id);

    students.splice(studentIndex, 1);
    updateLocalstorage();
    refreshTable();
}



function isNoData(data){

    let TableAlert = document.querySelector("#TableAlert");
    if (data.length == 0) {
        TableAlert.classList.remove('d-none');
        
    } else {
        TableAlert.classList.add('d-none');
    }
}

function insertStudentIntoForm(id) {
    resetForm();
    let editStudent = students.find(function (student) {
            return student.id == id;
        }),
        formBtn = registerForm.querySelector("button");

    for (let input of registerInputs) {
        input.value = editStudent[input.name];
        checkInput(input); 
    }

    formBtn.textContent = "Edit";
    formBtn.classList.add('btn-info', 'text-light');
    formBtn.classList.remove('btn-success');
    registerForm.setAttribute('data-type', 'edit');
    registerForm.setAttribute('data-student-id', id);
}

function editStudent() {
    let focusInput = registerForm.querySelector("input:focus");
    focusInput?.blur();

    let invalidInput = registerForm.querySelector("input[data-valid='false']"),
        invalidClassInput = registerForm.querySelector("input.is-invalid");

    if (invalidInput !== null || invalidClassInput !== null) {
        return;
    }

    let studentId = registerForm.dataset.studentId,
        student = getStudent(studentId),
        studentIndex = getStudentIndex(studentId);

    students[studentIndex] = student;

    updateLocalstorage();
    refreshTable();
    resetForm();
}


function search(searchValue) {
    let value = searchValue.toLowerCase().trim();

    let filteredStudents = students.filter(function (student) {
        return [
            student.firstName,
            student.lastName,
            student.email,
            student.phone,
            student.age
        ].some(function (field) {
            return String(field).toLowerCase().includes(value);
        });
    });

    showStudents(filteredStudents);
}

function refreshTable() {
    search(searchInput.value);
}