let $title = document.querySelector('.title');
let $author = document.querySelector('.author');
let $pages = document.querySelector('.pages');
let $read = document.querySelector('.read');
let tableBody = document.querySelector('.table-body');
let table = document.querySelector('.table');


table.addEventListener('click', (e) => {
    const currentTarget = e.target.parentNode.parentNode.childNodes[1];
    if (e.target.classList.contains('delete-img')) {
      if (confirm(`Are you sure you want to delete ${currentTarget.textContent}`))
        deleteBook(findBook(myLibrary, currentTarget.innerText));
    }
    if (e.target.classList.contains("read-button")) {
      changeStatus(findBook(myLibrary, currentTarget.innerHTML));
    }
    updateLocalStorage()
    showBooks();
});


const $form = document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    addBookToLibrary();
    showBooks();
    clearForm();
  });





let myLibrary = [];

function booksInfo() {
    const booksRead = document.querySelector('#books-read');
    const booksUnread = document.querySelector('#books-unread');
    const totalBooks = document.querySelector('#total-books');
    let readCounter = 0;
    let unreadCounter = 0;
    booksRead.textContent = 0;
    booksUnread.textContent = 0;
    for (let i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].read === 'Read') {
        readCounter +=1;
        booksRead.textContent = readCounter;
      } else if (myLibrary[i].read === 'Not read') {
        unreadCounter += 1;
        booksUnread.textContent = unreadCounter;
      }
      totalBooks.textContent = myLibrary.length;
    }
}


const DEFAULT_DATA = [
    { 
        title: "Stranger", 
        author: "Albert Camus", 
        pages:"125", 
        read: "Read" 
    },
    {
        title: "Process",
        author: "Franz Kafka",
        pages:"220",  
        read: "Read",
    },
    { 
        title: "Meditation", 
        author: "Marcus Aurelie", 
        pages: '312', 
        read: "Read"
     },
  ];

function clearForm() {
  $title.value = "";
  $author.value = "";
  $pages.value= "";
}

function deleteBook(currentBook) {
  if (currentBook == 0)
  myLibrary.splice(currentBook, currentBook + 1);
  else {
    myLibrary.splice(currentBook, currentBook);
  }
}
function changeStatus(book) {
  if (myLibrary[book].read === "Read") {
    myLibrary[book].read = "Not read";
  } else myLibrary[book].read = "Read";
}

function findBook(libraryArray, title) {
  if (libraryArray.length === 0 || libraryArray === null) {
    return;
  }
  for (book of libraryArray)
    if (book.title === title) {
      return libraryArray.indexOf(book);
    }
}

function Book(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
};


function addBookToLibrary(book) {
    if ($title.value.length === 0 || $author.value.length === 0 || $pages.value.length === 0) {
        alert("Please, fill all the fields");
        return;
    }
    const newBook = new Book($title.value, $author.value, $pages.value, $read.value,);

    myLibrary.push(newBook);
    updateLocalStorage();
};

function updateLocalStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    //library = JSON.parse(localStorage.getItem("library"));
  }


function checkLocalStorage() {
    if (localStorage.getItem("myLibrary")) {
      myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    } else {
      myLibrary = DEFAULT_DATA;
    }
  }

function showBooks () {
    checkLocalStorage();
    booksInfo()
    tableBody.textContent = "";
    myLibrary.forEach((book) => {
        const htmlBook = `
        <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td><button class="read-button">${book.read}</button></td>
            <td><img class='delete-img' value='delete' src="./styles/photos/delete-button-svgrepo-com.svg"></td>
        </tr>
        `;
        tableBody.insertAdjacentHTML("afterbegin", htmlBook);
    })
}
showBooks();


console.log(myLibrary)
