//Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

//Add book to list
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list');
  //create tr customElements
  const row = document.createElement('tr');
  row.innerHTML = `<td>${book.title}</td> 
                    <td>${book.author}</td> 
                    <td>${book.isbn}</td> 
                    <td><a href="#" class="delete">X</a></td>`;

  list.appendChild(row);
};

UI.prototype.showAlert = function (massage, className) {
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
};

//Delete Book
UI.prototype.removeItem = function (target) {
  if (target.classList.contains('delete')) {
    if (confirm('are you sure?')) {
      target.parentElement.parentElement.remove();
    }
  }
};

UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

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
  ui.removeItem(e.target);

  //Show Removed
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
});
