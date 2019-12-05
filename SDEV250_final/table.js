/*
 *    Module 2
 *    Individual Project

 *    SleepWalker table
 *    Table of screen/nav info
 *    Author: Seth Hunt
 *    Date:   2019-11-13

 *    Filename: table.js
 */

function getInfo(){
    document.getElementById("screen_width").innerHTML = screen.width + " pixels per inch";
    document.getElementById("screen_height").innerHTML = screen.height + " pixels per inch";
    document.getElementById("screen_resolution").innerHTML = screen.pixelDepth + " bits per pixel";
    document.getElementById("os").innerHTML = navigator.platform;
    document.getElementById("browser").innerHTML = navigator.appVersion;
    document.getElementById("appname").innerHTML = navigator.userAgent;
}




window.addEventListener("load", getInfo, false);