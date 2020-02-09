function downloadBook(){var bookName = document.getElementById("bookDownload").value;
// book download request
var downloadRequest = new XMLHttpRequest();
downloadRequest.onreadystatechange = function(){
    
    switch(this.readyState){
        case 4:
            if(this.status == 200){
                alert("Downloading book...");
                window.location = "http://192.168.1.2:7500/nglibrary/api/book/db/download/"+bookName;
            }
            if (this.status == 404) {
                alert("Error downloading book. File not found");
                return;
            }
            break;
        
    }
};

downloadRequest.open("GET", "http://192.168.1.2:7500/nglibrary/api/book/db/download/"+bookName, true);
downloadRequest.send();}