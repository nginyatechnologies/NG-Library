xHttp = new XMLHttpRequest;
let newPwd = document.getElementById('pwd');
let kPwd = document.getElementById('kpwd');
let warningMessage = document.getElementById('wrong-email-input');

function onSubmitPassword(){
    checkPwd = newPwd.value.split('');
    console.log(checkPwd);
    if(checkPwd.length < 8){
        warningMessage.innerHTML = "password should be atleast 8 characters long";
    }
    else{
        if(newPwd.value != kPwd.value){
            warningMessage.innerHTML = "passwords do not match";
        }
        else{
            sendPassword();
        }
    }
}

// sends password to api
function sendPassword(){
    let baseUrl="http://192.168.43.14:7500/nglibrary/api/user/reset%password";
    xHttp.open("POST", baseUrl, true);
    xHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let email = localStorage.getItem('validEmail');
    xHttp.send(`newPassword=${newPwd.value}&email=${email}`);
    xHttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
            window.location = "../views/Login.html";
        }
    }
}