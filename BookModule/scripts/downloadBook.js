var bookName = "";
// book download request
var downloadRequest = new XMLHttpRequest();
downloadRequest.onreadystatechange = function(){
    console.log(JSON.parse(this.responseText));
    
    switch(this.readyState){
        case 4:
            if(this.status == 200){
                alert("Downloading book...");
                console.log(JSON.parse(this.response));
                

            }
    }
}

downloadRequest.open("GET", "http://192.168.1.2:7500/nglibrary/api/book/download/"+bookName);
downloadRequest.send();