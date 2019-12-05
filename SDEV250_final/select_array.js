"use strict";
var selectArray = [];

function fillHidden() {
    var hides = document.querySelectorAll("input[type=hidden]");
    for (var i = 0; i < selectArray.length; i++) {
        hides[i].value = selectArray[i];
    }
}

function pullSelect() {
    console.log("you are pressing a button!!");
    var selections = document.querySelectorAll("input[type=checkbox]");
    for (var i = 0; i < selections.length; i++) {
        if (selections[i].checked == true) {
            selectArray[i] = selections[i].name
        } else if (selections[i].checked == false) {
            selectArray[i] = "";
        }

    }

}

function resetArray() {
    selectArray = [];

}

function parseHides() {
    var ulist = document.getElementById("myList");
    while(ulist.hasChildNodes()){
        ulist.removeChild(ulist.firstChild);
    }
    var formData = document.querySelectorAll("input[type=hidden]");
    var formArray = [];
    var list = document.querySelector("div.results ul");

    for (var i = 0; i < formData.length; i++) {
        formArray[i] = formData[i].value;
        var newItem = document.createElement("li");
        newItem.innerHTML = formArray[i];
        list.appendChild(newItem);
    }
}


function handleForm(evt) {
    if (evt.preventDefault) {
        evt.preventDefault(); //prevent from form submitting
    } else {
        evt.returnValue = false; // prevent form from submitting in IE8
    }
    resetArray();
    pullSelect();
    fillHidden();
    parseHides();


}


function createEventListeners() {
    var button = document.getElementById("mySubmit");
    if (button.addEventListener) {
        button.addEventListener("click", handleForm, false)
    } else if (button.attachEvent) {
        button.attachEvent("onclick", handleForm);
    }

}

if (window.addEventListener) {
    window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", createEventListeners);
}