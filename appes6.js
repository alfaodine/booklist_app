class Book{
    constructor (title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    } 
}

class UI{
    addBookToList(book){
        const list = document.getElementById('book-list');
        //create an element
        const row = document.createElement('tr');
        //insert cols
        row.innerHTML = `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                        <td><a href="#" class="delete">X</a></td>`
        
        list.appendChild(row);
    }
showAlert(messege, className){
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(messege));
    //get a parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    //insert alert
    container.insertBefore(div, form);
    //Timeout after 3 sec
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000);
}
deleteBook(target){
    target.parentElement.parentElement.remove();
}
clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}
}

// Local Storage Class

class Store{
    
    static getBooks(){
let books;
if (localStorage.getItem('books') === null){
    books = [];
} else {
    books = JSON.parse(localStorage.getItem('books'));
}
return books;
    }

    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(function(book){
        const ui = new UI;
        ui.addBookToList(book);
        })
    }

    static addBook(book){
const books = Store.getBooks();
books.push(book);
localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach(function(book, index){
        if (book.isbn === isbn){
            books.splice(index, 1);
            
        }    
        });
localStorage.setItem('books', JSON.stringify(books));
    }
}

//DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//Event listeners

document.getElementById('book-form').addEventListener('submit', function(e){
    //get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;
//instatiate a book
 const book = new Book(title, author, isbn);

 
 //Create new UI
 const ui = new UI();

 //Validation
 if(title === '' || author === '' || isbn === ''){
 // Error alert
 ui.showAlert('Please fill in all fields', 'error');
 }else{
 //Add book to list
 ui.addBookToList(book);

 //Add book to LS
 Store.addBook(book);

 ui.showAlert('Book added!', 'success');

 //clear fields
 ui.clearFields();
 }



    e.preventDefault();
})

document.querySelector('#book-list').addEventListener('click', function(e){
    if (e.target.className = 'delete'){
        const ui = new UI();
        //Remove from LS
        Store.removeBook
        (e.target.parentElement.previousElementSibling.textContent);

        ui.deleteBook(e.target);




        ui.showAlert('Book deleted', 'error');
    }
})