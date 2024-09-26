function initListeners() {

    $("#addToStorage").on("click", (e) => {
        e.preventDefault()
        let fNameRaw = $("#fName").val()
        let lNameRaw = $("#lName").val()
        let phoneRaw = $("#phone").val()
        let emailRaw = $('#email').val()
        let classesRaw = $("#classes").val()
        if (!fNameRaw || !lNameRaw || !phoneRaw || !email || !classesRaw) {
            alert("ERROR: Please enter all the fields needed")
        }
        else {
            validateForms(fNameRaw, lNameRaw, phoneRaw, emailRaw, classesRaw)
        }
        
    })
    $("#getAllStudents").on("click", (e) => {
        e.preventDefault();
        getAllStudents()
    })
}
function validateForms(fName, lName, phone, email, classes) {
let fNameTrans = fName.trim()
let lNameTrans = lName.trim()
let valClasses = []
let valEmail = validateEmail(email)
let valPhone = validatePhone(phone)
let valFName = validateName(fNameTrans)
let valLName = validateName(lNameTrans)
let classesTrans1 = classes.trim()
let classesTrans2 = classesTrans1.split(',')
let finalFName;
let finalLName;
if (valFName == false && valLName == false) {
    finalFName = fNameTrans
    finalLName = lNameTrans
    console.log(finalFName, finalLName) 
}

let studentObj = {
    
}


$.each(classesTrans2, function(idx,value) {
    if (value != "") {
        valClasses.push(value)
    }
} )


if (!valEmail) {
    alert("Your Email is incorrect. Please re-enter it.")
    throw new Error("Email is incorrect")

}
if (valPhone == true || valPhone.length < 10 || valPhone.length > 10) {
    alert("Your phone is incorrect. Please re-enter it.")
    throw new Error("Phone is incorrect")
}
if (valFName == true) {
    alert("Your First Name is incorrect. Please re-enter it.")
    throw new Error("First Name is incorrect")
}
if (valLName == true) {
    alert("Your Last Name is incorrect. Please re-enter it.")
    throw new Error("Last Name is incorrect")

}

if (valEmail == true && valPhone == false && valFName == false && valLName == false) {
    studentObj = {
        fName: finalFName,
        lName: finalLName,
        phone: phone,
        email: email,
        classes: valClasses
    }
    addStudent(studentObj)
}

console.log(valClasses)
}
function connectToStorage() {
    if (localStorage) {
        console.log("Storage detected. Fetching...") 
        let classes = JSON.parse(localStorage.getItem("Students"))
        if (classes) {
            console.log("already exists")
            console.log(classes)
        }
        else {
            localStorage.setItem("Students", '[]')
        }
        
    }
    else {
        console.log("No Storage Detected")
    }
 }

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function validatePhone (phone) {
    var re = /[^\d]/;
    return re.test(phone)
  }

  function validateName(name) {
    var re = /[0-9]/;
    return re.test(name)
  }

  function addStudent(studentObj) {
    let allStudents = JSON.parse(localStorage.getItem("Students"))
    allStudents.push(studentObj)
    localStorage.setItem("Students", JSON.stringify(allStudents))
  }
  function getAllStudents() {
    $("#studentList").html("") 
    let allUsers = JSON.parse(localStorage.getItem("Students"))    
    let userString = "";
    $.each(allUsers, function (idx, user) { 
        userString += "<p>";
        userString += `Name: ${user.fName} ${user.lName}<br>Phone: ${user.phone}<br>Email: ${user.email}<br> Classes: <ul>`
         $.each(user.classes, function (index, value) {
        userString += "<li>" + value + "</li>"
         })
         userString += "</ul>"
         userString += '</p>'
         $("#studentList").append(userString)
    });
  
 }
$("document").ready((e)=> {
    initListeners();
    connectToStorage();
})