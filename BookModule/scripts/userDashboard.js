let dashboard = document.getElementById('user-dashboard-body');
let xHttp = new XMLHttpRequest;

// occurs on page load
dashboard.addEventListener('load',function(){
    let userName = JSON.parse(localStorage.getItem('loginResponse'));
    document.getElementById('userName').innerHTML=userName.user.userName;   
});

// gets recently opened books from database
function getRecentBooks(){

}