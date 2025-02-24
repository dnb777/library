const booksContainer = document.querySelector(".books-container");
const newBookForm = document.querySelector("#new-book-form");

const myLibrary = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary(title, author, pages, status) {
    const newBook = new Book(title,author,pages,status);
    myLibrary.push(newBook);
    displayBooks();
}


// creates the html element for the card and append it to the book-container
function displayBooks() {
    booksContainer.innerHTML = "";
    myLibrary.forEach(book => {
        const card = document.createElement("div");
        card.classList.add("card")
    
        const title = document.createElement("h3");
        title.textContent = book.title;
        title.classList.add("book-title")
    
        const description = document.createElement("ul");
    
        const author = document.createElement("li");
        author.textContent = `Author: ${book.author}`;
        author.classList.add("book-description");
    
        const pages = document.createElement("li");
        pages.textContent = `Pages: ${book.pages}`;
        pages.classList.add("book-description");
    
        const status = document.createElement("li");
        status.textContent = `Status: ${book.status}`;
        status.classList.add("book-description");
    
        
        booksContainer.appendChild(card);
        card.appendChild(title);
        card.appendChild(description);
        description.appendChild(author);
        description.appendChild(pages);
        description.appendChild(status);
    });
}


// stops the form from submiting and calls addBookToLibrary with the user input
newBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    
    let selected;
    const radioButtons = document.querySelectorAll("input[name='status']");
    for (const radioButton of radioButtons){
        if (radioButton.checked) {
            selected = radioButton.value;
        }
    }
    const status = selected;



    addBookToLibrary(title, author, pages, status);
    newBookForm.reset();
})