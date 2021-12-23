//------------------------------- Define Objects--------------------------------------------------//

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  //Add book to list
  addBookToList(book) {
    const list = document.getElementById('book-list');
    //create tr customElements
    const row = document.createElement('tr');
    row.innerHTML = `<td>${book.title}</td> 
                      <td>${book.author}</td> 
                      <td>${book.isbn}</td> 
                      <td><a href="#" class="delete">X</a></td>`;

    list.appendChild(row);
  }

  showAlert(massage, className) {
    const div = document.createElement('div');
    //add classname
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(massage));
    //get Perent
    const container = document.querySelector('.container');
    //Get Form
    const form = document.querySelector('#book-form');
    //insert alert
    container.insertBefore(div, form);
    //timeout afer 3s
    setTimeout(function clearError() {
      document.querySelector('.alert').remove();
    }, 2000);
  }

  //Delete Book
  removeItem(target) {
    if (target.classList.contains('delete')) {
      if (confirm('are you sure?')) {
        target.parentElement.parentElement.remove();
      }
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

//local storage class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  static displayBook() {
    const books = Store.getBooks();

    books.forEach(function (book) {
      const ui = new UI();
      //Add book to UI
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-----------------------------------Run Programe-----------------------------------------------------------------------------------------------------------------------//

//DOM Load Event (afer adding LS - prevvent data loss from refresh)
document.addEventListener('DOMContentLoaded', Store.displayBook);

//Event Listenter for add
document.getElementById('book-form').addEventListener('submit', function (e) {
  //Get Form Values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  //Instantiate Book
  const book = new Book(title, author, isbn);

  //Initiate UI
  const ui = new UI();

  //Validate
  if (title === '' || author === '' || isbn === '') {
    //Error Alert
    ui.showAlert('Please fill in all Fields', 'error');
  } else {
    //Add book to list
    ui.addBookToList(book);

    //set Local Stroage
    Store.addBook(book);

    //Show Success
    ui.showAlert('Book Added', 'success');

    // Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

//Event Listenter for delete

document.getElementById('book-list').addEventListener('click', function deleteItem(e) {
  //Initiate UI
  const ui = new UI();

  //Remove Book
  ui.removeItem(e.target);

  //Remove from LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //Show Removed
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
});
