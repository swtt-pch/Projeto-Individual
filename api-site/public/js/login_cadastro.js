var login = document.querySelector("#login")
var cadastro = document.querySelector("#cadastro");

function cadAcess() {
    document.querySelector("#login").style.marginLeft = "-100%";
    setTimeout(function () {
        document.querySelector("#cadastro").style.marginLeft = "0px";
    }, 2000)
    
}

function logAcess() {
    document.querySelector("#cadastro").style.marginLeft = "-100%";
    setTimeout(function () {
        document.querySelector("#login").style.marginLeft = "0";
    }, 2000)
}