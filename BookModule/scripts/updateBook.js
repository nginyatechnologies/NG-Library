// get view field IDs
var titleFieldId = "titleView";
var authorFieldId = "authorView";
var categoryFieldId = "categoryView";
var fileFieldId = "fileView";
var imageFieldId = "thumbnailView";
var bookTypes;
var bookCategories;
var cancelButtonId = "cancelButton";
var applyButtonId = "saveButton";
var bookId = "";
var href = window.location.href;
    bookId = href.substring(href.indexOf("?")+1, href.length-1);

// book types and categories will be updated immediately the user logs in

// get book types and categories
let bookInfoRequest = new XMLHttpRequest();
bookInfoRequest.onreadystatechange = function(){
    // console.log(JSON.parse(this.responseText));
    
    if(this.status == 200){
        if(this.readyState == 4){
            bookTypes = JSON.parse(this.responseText).bookInfo.fileTypes;
            bookCategories = JSON.parse(this.responseText).bookInfo.categories;
        }
    }
};
bookInfoRequest.open("GET", "http://192.168.1.2:7500/nglibrary/api/books/info", true);
bookInfoRequest.send();


      


bookInfoRequest.open("GET", "http://192.168.1.3:7500/nglibrary/api/book/file/details/"+bookId, true);
bookInfoRequest.setRequestHeader("apiKey", localStorage.getItem("apiKey"));
bookInfoRequest.send();
// book querying complete

function loadUpdateView(book) {
    console.log(book);
    
    
    // get file data from local storage
    let title = book.bookTitle, author = book.bookAuthor,
        category = book.bookCategory;
    console.log(title, author, category);
    
    // update view
    document.getElementById(titleFieldId).value = title;
    document.getElementById(authorFieldId).value = author;
    
    populateSelectInput(categoryFieldId, bookCategories);
    document.getElementById(categoryFieldId).value = category;
    // document.getElementById(imageFieldId).src = image.src;
}

// view update complete

// handle changes
function updatesHandler() {
    let apiKey = localStorage.getItem("apiKey");
    // include @bookId
    let title = document.getElementById(titleFieldId).value;
    let author = document.getElementById(authorFieldId).value;
    let category = document.getElementById(categoryFieldId).value;
    let file = document.getElementById(fileFieldId).files;

}

// handle the cancel button
document.getElementById(cancelButtonId).onclick = function(){
    window.history.back();
};

// handle the save/apply button
document.getElementById(applyButtonId).onclick = function(){
    updatesHandler();
};

// update selection input
function populateSelectInput(fieldId, optionsArray) {
    optionsArray.forEach(element => {
        let option = document.createElement("option");
        option.value = element;
        option.innerText = element;
        document.getElementById(fieldId).appendChild(option);
    });
}