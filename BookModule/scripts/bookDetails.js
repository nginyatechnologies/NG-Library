import { END_POINTS } from "./resource";

// ge details and load the view
var bookDetails;
var url = window.location.href;
var bookId = url.substring(url.indexOf("?")+1, url.length -1);
var bookDetailsRequest = new XMLHttpRequest();
bookInfoRequest.onreadystatechange = function(){
    if (this.readyState == 4) {
        if (this.status == 200) {
            bookDetails = (JSON.parse(this.responseText)).book;
        }
    }
};
bookDetailsRequest.open("GET",END_POINTS.ROUT_BOOK_DETAILS+"/"+bookId, true);
bookDetailsRequest.setRequestHeader("apiKey", localStorage.getItem("apiKey"));
bookDetailsRequest.send();


var openBookEndpoint = "";

// var imageBitmap = createImageBitmap("C:/Users/warrior-man/Downloads/9k= (6).jpg");

document.getElementById("thumbnailFrame").querySelectorAll("img")[0].src = bookDetails.image;
// load details view
document.getElementById("titleView").innerText = bookDetails.bookTitle;
document.getElementById("authorView").innerText = bookDetails.bookAuthor;
document.getElementById("categoryView").innerText = bookDetails.bookCategory;

document.querySelector("#editButton").addEventListener("click", function(){
    // localStorage.setItem("bookDetails", bookDetails);
    // window.location.assign("../views/bookUpdate.html?"+bookDetails.bookId);
    window.location.assign("../views/bookUpdate.html?"+bookDetails.bookId);

});

document.querySelector("#openButton").addEventListener("click", function(){
    alert("opening book ...");
    downloadBook(bookDetails.bookTitle);
});

document.querySelector("#deleteButton").addEventListener("click", function(){

   alert(window.location.href);
    switch(confirm("Do you want to delete "+ bookDetails.bookTitle +" ?")){
        case true:
            deleteBook(bookDetails.bookId);
        break;
        case false:
            break;
            default:
                break;
    }
   
});

document.querySelector("#backButton").addEventListener("click", function(){
    window.history.back();
});

document.getElementById("thumbnailFrame").querySelectorAll("img")[0].addEventListener("click", function(){
    $("#openButton").click();
});

// 