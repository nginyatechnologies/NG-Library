// begin by querying book book with given ID
var bookId = "";

var bookInfoRequest = new XMLHttpRequest();
bookInfoRequest.onreadystatechange = function(){
    if(this.readyState == 4){
        if (this.status == 200) {
            // fill the book details view
            console.log(this.responseText);

        }
    }
};
// get view field IDs
    var titleFieldId = "", authorFieldId = "",
     categoryFieldId = "", fileFieldId = "",
      imageFieldId = "";

bookInfoRequest.open("GET", "http://192.168.1.2:7500/nglibrary/api/book/update/"+bookId, true);
bookInfoRequest.send();

function loadUpdateView() {
    
    
    // get file data from local storage
    let title = localStorage.getItem("bookTitle"), author = localStorage.getItem("bookAuthor"),
        category = localStorage.getItem("bookCategory"), file = localStorage.getItem("bookFile"),
        image = localStorage.getItem("bookImage");

    // update view
    document.getElementById(titleFieldId).innerText = title;
    document.getElementById(authorFieldId).innerText = author;
    document.getElementById(categoryFieldId).innerText = category;
    document.getElementById(imageFieldId).src = image.src;
}
// view update complete

// handle changes
function updatesHandler() {
    let title = document.getElementById(titleFieldId).value;
    let author = document.getElementById(authorFieldId).value;
    let category = document.getElementById(categoryFieldId).value;
    let file = document.getElementById(fileFieldId).files;

}
