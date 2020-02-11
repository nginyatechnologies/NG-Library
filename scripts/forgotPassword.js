// creates a new xmlhttprequest object
let xHttp = new XMLHttpRequest();
let paragraphHeader = "Check email for confirmation code";
let inputCode = "confirmation code here";
let showCodeInput = false;
let submitEmail = document.getElementById('email-input');
let emailInput = document.getElementById('wrong-email-input');

// function called when email is submitted
function onSubmit(){
    // validation of password reset form
    if(submitEmail.value == ""){
    emailInput.innerHTML = "field can not be left empty";
    }
    else {
        let submitEmail1 = validateEmail(submitEmail.value);
        console.log(submitEmail1);
        if(!submitEmail1){
            emailInput.innerHTML = "email should be of the name@example.com";
        }
        else{
            sendEmail(submitEmail.value);
        }
}
}

// validates email
function validateEmail(elementValue){      
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue); 
  } 

// sends email and receive response from server
function sendEmail(inputEmail){
    let baseUrl = "http://192.168.1.3:7500/nglibrary/api/user/recovery";
    xHttp.open("POST",baseUrl,true);
    xHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    localStorage.setItem("validEmail",inputEmail);
    xHttp.send(`email=${inputEmail}`);
    xHttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById('paragraph-info').innerHTML = paragraphHeader;
            let verificationField = document.getElementById('email-input');
            verificationField.value = inputCode;
            let submitButton1 = document.querySelector('#submit-button');
            submitButton1.style.display = 'none';
            let submitButton2 = document.getElementById('code-submit-button');
            submitButton2.innerHTML = "send";
            submitButton2.classList.add('code-submit-button');
            console.log(this.responseText);
        }
    }
}

// sends verification code to server
function onCodeSubmit(){
    if(submitEmail.value == ""){
        emailInput.innerHTML = "field can not be left empty";
    }

    let codeUrl = "http://192.168.1.3:7500/nglibrary/api/user/account%verification";
    xHttp.open("POST",codeUrl,true);
    xHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let verifyCode = document.getElementById('email-input');
    xHttp.send(`verifyCode=${verifyCode.value}`);
    xHttp.onreadystatechange = function(){
        console.log(this.responseText);
        if(this.readyState == 4 && this.status == 200){
            window.location = "../views/newPassword.html";
            console.log(this.responseText);
        }
    }
}