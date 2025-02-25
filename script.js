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
    myLibrary.forEach((book, index) => {
        // creates the html elements of the cards
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
        
        // Add delete button with an svg
        const deleteBtn = document.createElement("button");
        //the data-index is used to delete the books
        deleteBtn.setAttribute('data-index', index); 
        deleteBtn.classList.add("card-buttons");
        deleteBtn.id = "delete";
        deleteBtn.innerHTML = `<svg id="delete-book" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;

        
        deleteBtn.addEventListener('click', (e) => {
            const index = e.target.closest("button").getAttribute("data-index");
            deleteBook(index);
        })

        // append's the created elements to booksContainer
        booksContainer.appendChild(card);
        card.appendChild(title);
        card.appendChild(description);
        description.appendChild(author);
        description.appendChild(pages);
        description.appendChild(status);
        card.appendChild(deleteBtn);
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