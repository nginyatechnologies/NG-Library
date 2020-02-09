// add book to the library

// input field IDs
var bookTitleFieldId = "bookTitleField", bookCategoryFieldId = "bookCategoryField",
    bookAuthorFieldId = "bookAuthorField", bookFilePathId = "fileField";

// Query book categories and book file-types
var bookTypes, bookCategories;
let bookInfoRequest = new XMLHttpRequest();
bookInfoRequest.onreadystatechange = function(){
    // console.log(JSON.parse(this.responseText));
    
    if(this.status == 200){
        if(this.readyState == 4){
            bookTypes = JSON.parse(this.responseText).bookInfo.fileTypes;
            bookCategories = JSON.parse(this.responseText).bookInfo.categories;

            populateSelectInput(bookCategoryFieldId, bookCategories);
            console.log(bookTypes);
            console.log(bookCategories);
        }
    }
};
bookInfoRequest.open("GET", "http://192.168.1.2:7500/nglibrary/api/books/info", true);
bookInfoRequest.send();

// book has title, category, author, bookfile
function addBook() {

     var bookTitle = document.querySelector("#"+bookTitleFieldId).value;
     var bookCategory = document.querySelector("#"+bookCategoryFieldId).value;
     var bookAuthor = document.querySelector("#"+bookAuthorFieldId).value;
     var bookFileNode = document.querySelector("#"+bookFilePathId);
    //  localStorage.setItem("image", document.querySelector("#imageField").files[0]);
    //  document.querySelector("#imageView").src = localStorage.getItem("image");
         
    // validate input
    if(bookTitle.length < 3){
        alert("Invalid book title. Book title must be atleast three(3) characters");
        return;
    }
    if(bookCategories.indexOf(bookCategory) <= -1){
        alert("Error. Book category invalid");
        return;
    }
    if (bookAuthor.length < 3) {
        alert("Invalid author. Author must be atleast three(3) characters long");
        return;
    }
    // check if book file is selected
    if (bookFileNode.files) {
        
        // check if exactly one book is selected
        if(bookFileNode.files.length == 1){
            // check for book type
            console.log(bookFileNode.value);
            let filePathSegments = bookFileNode.value.split(".");
            
            let fileExtension = "."+filePathSegments[filePathSegments.length - 1];
            if (bookTypes.indexOf(fileExtension) <= -1) {
                alert("Invalid input. Unsupported file type");
                return;
            }           
        }
        else{
            alert("Error: Only one book can be uploaded at a time");
            return;
        }       
    }else{
        alert("Error: Must supply a book");
        return;
    }

    //  create a request object
    var formData = new FormData();

    formData.set("book", bookFileNode.files[0]);
    formData.set("bookTitle", bookTitle);
    formData.set("bookCategory", bookCategory);
    formData.set("bookAuthor", bookAuthor);

    var saveBookObject = new XMLHttpRequest();
    // handle response 
    saveBookObject.onreadystatechange = function(){
        console.log(this.responseText);
        
        switch (this.status) {
            case 200:
                
                if(this.readyState == 4){
                    if (JSON.parse(this.responseText).success == true) {
                        
                        alert("Book successfully added to library");
                    }
                }
                break;      
            default:
                break;
        }
    };
    saveBookObject.open("POST", "http://192.168.1.2:7500/nglibrary/api/book/db/upload", true);
    // saveBookObject.setRequestHeader("Content-type", "multipart/form-data");
    saveBookObject.send(formData);
    // saveBookObject.send(`bookTitle=${bookTitle}& bookCategory=${bookCategory}& bookAuthor=${bookAuthor} &file=${bookFileNode.files[0]}`);
    
}
function populateSelectInput(fieldId, optionsArray) {
    optionsArray.forEach(element => {
        let option = document.createElement("option");
        option.value = element;
        option.innerText = element;
        document.getElementById(fieldId).appendChild(option);
    });
    
}