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
    $("#searchBtn").on("click", (e) => {
        e.preventDefault();
        searchStudent()
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
  function searchStudent() {
    let search = $("#search").val()
    if (search == "") {
        alert("Please enter an ID.")
        throw new Error("ID not found")
    }
    let allUsers = JSON.parse(localStorage.getItem("Students"))    
    let user = allUsers[search - 1]
    if (!user) {
        alert("User not Found")
        throw new Error("User not found")
    }
    $("#studentList").html("") 
    let userString = "";
    userString += "<div class='user'>";
    userString += "<p>";
    userString += `user ID: ${search}<br>`
    userString += `Name: ${user.fName} ${user.lName}<br>Phone: ${user.phone}<br>Email: ${user.email}<br> Classes: <ul>`
     $.each(user.classes, function (index, value) {
    userString += "<li>" + value + "</li>"
     })
     userString += "</ul>"
     userString += '</p>'
     userString += "</div>"
     $("#studentList").append(userString)
  }
  function getAllStudents() {
    $("#studentList").html("") 
    let allUsers = JSON.parse(localStorage.getItem("Students"))    
    let userString = "";
    console.log(allUsers)
    $.each(allUsers, function (idx, user) { 
        userString += "<div class='user'>";
        userString += "<p>";
        userString += `user ID: ${idx + 1}<br>`
        userString += `Name: ${user.fName} ${user.lName}<br>Phone: ${user.phone}<br>Email: ${user.email}<br> Classes: <ul>`
         $.each(user.classes, function (index, value) {
        userString += "<li>" + value + "</li>"
         })
         userString += "</ul>"
         userString += '</p>'
         userString += "</div>"
    });
    $("#studentList").append(userString)

 }
$("document").ready((e)=> {
    initListeners();
    connectToStorage();
})