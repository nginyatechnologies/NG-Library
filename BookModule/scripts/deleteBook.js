// delete book with ID.
// get the file details
function deleteBook(bookId) {

// localStorage.getItem("bookId");
// book deletion request
var deleteRequest = new XMLHttpRequest();
deleteRequest.onreadystatechange = function(){
    if (this.readyState == 4) {
        if (this.status == 200) {
            alert("Successfully deleted.");
            console.log(JSON.parse(this.responseText));
        }
        else{
            alert("Error deleting book");
            return;
        }
    }
};
deleteRequest.open("DELETE", "http://192.168.1.2:7500/nglibrary/api/book/db/delete/"+bookId, true);
deleteRequest.send();
}