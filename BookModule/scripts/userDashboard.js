let xHttp = new XMLHttpRequest;
let userName = JSON.parse(localStorage.getItem('loginResponse'));
let constant = 0;

document.querySelector('body').addEventListener('load',onPageload());


// called on Pageload
 function onPageload(){
    console.log(userName.user.userName);
    document.getElementById('userName').innerHTML = userName.user.userName;
    getPopularBooks(); 
    return;
 }

// gets recently opened books from database
function getPopularBooks(){
    let popularBooks = document.getElementById('pop-books-div');
    let Url = "http://192.168.1.3:7500/nglibrary/api/books/db/popular%books";
    xHttp.open("GET", Url, true);
    xHttp.setRequestHeader('apiKey')
    xHttp.send();
    
    xHttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let newResponse = JSON.parse(this.responseText);
            if(newResponse.success == false){
                alert('An error occured. Please reload page');
            }
            console.log(newResponse);
            console.log(this);
            localStorage.setItem('bookInfo','newResponse');

            newResponse.forEach((response,index)=>{

                //dynamic create elements
                let book = document.createElement('div');
                let BookImg = document.createElement("img");
                let divCardBody = document.createElement("div");
                let h4 = document.createElement("h4");
                let cardContent = document.createElement('div');

                //add valid classes
                BookImg.classList.add("card-img-top");
                book.classList.add('col-sm-4');
                cardContent.classList.add('card');
                // BookImg.src = response.
                divCardBody.classList.add("card-body");
                h4.classList.add('card-title');
                h4.innerHTML = response.bookname;

                //append elements to DOM
                popularBooks.appendChild(book);
                book.appendChild(cardContent);
                cardContent.appendChild(BookImg);
                cardContent.appendChild(divCardBody);
                divCardBody.appendChild(h4);

                let allIcons = document.querySelectorAll('.card');
                allIcons.forEach((icon)=>{
                    icon.addEventListener("click",onCardClick);
                })
            })
        }
    }
    return;
}
// triggerered when book card is clicked

function onCardClick(){
    let bookDetails = document.getElementById('book-details');
    let section = document.createElement('section');
    bookDetails.appendChild(section);
    let bookID = responseText.user;
    window.location = './views/bookDetails.html?',bookID;

    // creates i tag for + fontawesome icon
    // let addIcon = document.createElement('i');
    // section.appendChild(addIcon);
    // addIcon.classList.add('fas');
    // addIcon.classList.add('fa-plus');
    
    // creates delete icon
    // let deleteIcon = document.createElement('i');
    // section.appendChild(deleteIcon);
    // deleteIcon.classList.add('fas');
    // deleteIcon.classList.add('fa-trash');

    // creates edit icon
    // let editIcon = document.createElement('i');
    // section.appendChild(editIcon);
    // editIcon.classList.add('fas');
    // editIcon.classList.add('fa-edit');
}