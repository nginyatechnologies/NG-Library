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
bookInfoRequest.open("GET", "http://192.168.1.2:7500/nglibrary/api/book/update/"+bookId, true);
