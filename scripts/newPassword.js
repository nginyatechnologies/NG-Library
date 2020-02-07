xHttp = new XMLHttpRequest;
let newPwd = document.getElementById('pwd');
let kPwd = document.getElementById('kpwd')

if(newPwd.value == kPwd.value)
function sendPassword(){
    xHttp.open("POST", baseUrl, true);
    xHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xHttp.send(`pwd=${pwd.value}`);
}