const booksContainer = document.querySelector(".books-container");
const newBookForm = document.querySelector("#new-book-form");

const myLibrary = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

Book.prototype.changeReadStatus = function(){
    this.status = (this.status === "not read") ? "read" : "not read";
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
        
        //buttons container
        const btnContainer = document.createElement("div");
        btnContainer.classList.add("card-buttons")
        
        // Add delete button with an svg
        const deleteBtn = document.createElement("button");
        //the data-index is used to delete the books
        deleteBtn.setAttribute('data-index', index); 
        deleteBtn.classList.add("card-btn");
        deleteBtn.innerHTML = `<svg id="delete-book" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;

        
        deleteBtn.addEventListener('click', (e) => {
            const index = e.target.closest("button").getAttribute("data-index");
            deleteBook(index);
        })

        const changeStatus = document.createElement("button");
        changeStatus.classList.add("card-btn");

        changeReadStatusIcon(changeStatus, book);

        changeStatus.addEventListener('click', (e) => {
            book.changeReadStatus();
            status.textContent = `Status: ${book.status}`; 
            changeReadStatusIcon(changeStatus, book);
        })


        // append's the created elements to booksContainer
        booksContainer.appendChild(card);
        card.appendChild(title);
        card.appendChild(description);
        description.appendChild(author);
        description.appendChild(pages);
        description.appendChild(status);
        card.appendChild(btnContainer);
        btnContainer.appendChild(deleteBtn);
        btnContainer.appendChild(changeStatus);
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


// deletes a book from the array and refresh display
function deleteBook(index) {
    //Use of Number() to avoid any possible error 
    myLibrary.splice(Number(index), 1);
    displayBooks();
}

// toggles the status icon 
function changeReadStatusIcon(button, book) {
    button.innerHTML = (book.status == "read") ? 
            `<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" ><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>` :
            `<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>`;
}


addBookToLibrary("The Hobbit", "J. R. R. Tolkien", 310, "not read");
addBookToLibrary("A Princess of Mars", "Edgar Rice Burroughs", 326, "read");
addBookToLibrary("Siddhartha", "Hermann Hesse", 152, "read");
addBookToLibrary("Animal Farm", "George Orwell", 92, "read");
addBookToLibrary("1984", "George Orwell", 326, "not read");