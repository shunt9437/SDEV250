/*
 *    Module 04
 *    Individual Project

 *    SleepWalker Order Form
 *    Math and If/Else
 *    Author: Seth Hunt
 *    Date:   2019-11-24

 *    Filename: order.js
 */

//global variables
var printCost = 0;
var totalCost = 0;
var artBook = false;
var reproductionRights = false;
var formValidity = true;

//calculates all costs based on prints and adds to total cost
function calcCost() {
    var num = document.getElementById("printnum");
    var commish = document.getElementById("commission");

    totalCost -= printCost;
    printCost = (num.value * 50) + (commish.value * 200);
    totalCost += printCost;
    document.getElementById("estimate").innerHTML = "$" + totalCost;
}

//adds/subtracts cost of art book from total cost
function toggleArtbook() {
    (document.getElementById("artbook").checked === false) ?
        totalCost -= 300 : totalCost += 300;
    document.getElementById("estimate").innerHTML = "$" + totalCost;
}

//adds/subtracts cost of reproduction rights from total cost
function toggleRights() {
    (document.getElementById("reprodrights").checked === false) ?
        totalCost -= 2000 : totalCost += 2000;
    document.getElementById("estimate").innerHTML =
        "$" + totalCost;
}

//set customer info
function setCustomer() {

    var custName = document.getElementsByTagName("input").myName.value;
    var custEmail = document.getElementsByTagName("input").myEmail.value;

    if (custName === "") {
        document.getElementById("myName").style.background = "rgb(255,233,233)";
    } else {
        document.getElementById("myName").style.background = "white";
    }
    if (custEmail === "") {
        document.getElementById("myEmail").style.background = "rgb(255,233,233)";
    } else {
        document.getElementById("myEmail").style.background = "white";
    }
}


function checkForm(fieldsetId) {
    var inputElements = document.querySelectorAll("#" + fieldsetId + " input");
    var errorDiv = document.querySelectorAll("#" + fieldsetId + " .errorMessage")[0];
    var fieldsetValidity = true;
    var elementCount = inputElements.length;
    var currentElement;
    var emailCheck = /^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/;

    try {
        for (var i = 0; i < elementCount; i++) {
            //validate all input elements in fieldset
            currentElement = inputElements[i];

            if (currentElement.value === "") {
                currentElement.style.background = "rgb(255,233,233)";
                currentElement.style.border = "2px solid red";
                fieldsetValidity = false;

            } else if ((currentElement.id === "myEmail") && (emailCheck.test(currentElement.value) === false)) {
                currentElement.style.background = "rgb(255,233,233)";
                currentElement.style.border = "2px solid red";
                fieldsetValidity = false;

            } else {
                currentElement.style.background = "white";
                currentElement.style.border = "none";
            }
        }

        if (fieldsetValidity === false) {
            //throw appropriate message based on current fieldset
            if (inputElements[0].value === "") {
                throw "Please enter your name";
            }
            if (inputElements[1].value === "") {
                throw "Please enter your email.";
            }
            if (emailCheck.test(inputElements[1].value) === false) {
                throw "Please enter a valid email";
            }
        }

    } catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;
    }
}

/*validate message fieldset*/
// function validateCustomer() {
//     var errorDiv = document.querySelector("#cusinfo .errorMessage");
//     var nameBox = document.getElementById("myName");
//     var emailBox = document.getElementById("myEmail");
//
//     try {
//         if ((nameBox.value === "") || (nameBox.value === nameBox.placeholder)) {
//             nameBox.placeholder = "Please enter your Name!";
//             nameBox.style.border = "2px solid red"
//         } else {
//             errorDiv.style.display = "none";
//             nameBox.style.background = "white";
//             nameBox.style.border = "none"
//         }
//         if ((emailBox.value === "") || (emailBox.value === emailBox.placeholder)) {
//             emailBox.placeholder = "Please enter your Email!";
//             emailBox.style.border = "2px solid red"
//         } else {
//             errorDiv.style.display = "none";
//             emailBox.style.background = "white";
//             emailBox.style.border = "none"
//         }
//
//     } catch (msg) {
//         errorDiv.style.display = "block";
//         errorDiv.innerHTML = msg;
//         nameBox.style.background = "rgb(255,233,233)";
//         formValidity = false;
//     }
// }

/*validate form*/
function validateForm(evt) {
    if (evt.preventDefault) {
        evt.preventDefault(); //prevent from form submitting
    } else {
        evt.returnValue = false; // prevent form from submitting in IE8
    }
    formValidity = true; // reset values for revalidation
    checkForm("cusinfo");

    // validateCustomer();


    //replace with call to validation functions
    if (formValidity === true) {
        document.getElementById("errorText").innerHTML = "";
        document.getElementById("errorText").style.display = "none";
        document.getElementsByTagName("form")[0].submit();
    } else {
        document.getElementById("errorText").innerHTML = "Please fix the indicated problems an then resubmit your order.";
        document.getElementById("errorText").style.display = "block";
        document.getElementById("errorText").style.color = "red";
        scroll(0, 0);
    }
}


//sets all form field values to defaults
function resetForm() {
    document.getElementById("printnum").value = 1;
    document.getElementById("commission").value = 2;
    document.getElementById("artbook").checked = artBook;
    document.getElementById("reprodrights").checked = reproductionRights;
    calcCost();
    setCustomer();
    createEventListeners();

}


//creates event listeners
function createEventListeners() {
    var mySubmit = document.getElementById("mySubmit");
    var emailInput = document.getElementById("myEmail");
    var nameInput = document.getElementById("myName");
    document.getElementById("printnum").addEventListener("change", calcCost, false);
    document.getElementById("commission").addEventListener("change", calcCost, false);
    document.getElementById("artbook").addEventListener("change", toggleArtbook, false);
    document.getElementById("reprodrights").addEventListener("change", toggleRights, false);
    document.getElementById("myName").addEventListener("change", setCustomer, false);
    document.getElementById("myEmail").addEventListener("change", setCustomer, false);
    mySubmit.addEventListener("click", validateForm, false);
    if (emailInput.addEventListener) {
        // nameInput.addEventListener("onchange", validateForm, false);
        emailInput.addEventListener("change", validateForm, false);
    } else if (emailInput.attachEvent) {
        // nameInput.attachEvent("onchange", validateForm);
        emailInput.attachEvent("onchange", validateForm);
    }
}

//reset form when page is reloaded
window.addEventListener("load", resetForm, false);

