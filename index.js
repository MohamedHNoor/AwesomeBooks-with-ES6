/* eslint-disable */
import { displayDate } from './modules/date.js';
import {
  openBookList,
  openAddBook,
  openContact
} from './modules/navigation.js';

import {
  bookInfo,
  title,
  author,
  form,
  listBtn,
  addBtn,
  contactBtn
} from './modules/variables.js';

let bookArr = [];

class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  static bookDisplay() {
    bookInfo.innerHTML = '';
    for (let i = 0; i < bookArr.length; i += 1) {
      const oneBook = document.createElement('div');
      oneBook.className = 'book';
      oneBook.innerHTML = `
        <p class="title">"${bookArr[i].title}" by ${bookArr[i].author}</p>
        <button class="remove" data-id=${bookArr[i].id}>Remove</button>
      `;
      bookInfo.appendChild(oneBook);
      title.value = '';
      author.value = '';
    }
    const removeBtn = document.querySelectorAll('.remove');
    removeBtn.forEach((book) => {
      book.addEventListener('click', () => {
        const dataSet = parseInt(book.dataset.id, 10);
        const btnId = bookArr.findIndex((object) => object.id === dataSet);
        Book.removeBook(btnId);
      });
    });
  }

  static addBook() {
    const eachBook = {};
    eachBook.id = bookArr.length;
    eachBook.title = title.value;
    eachBook.author = author.value;

    bookArr.push(eachBook);
    Book.bookDisplay();
    const jsonData = JSON.stringify(bookArr);
    localStorage.setItem('form', jsonData);
  }

  static removeBook(id) {
    bookArr.splice(id, 1);
    Book.bookDisplay();
    const jsonData = JSON.stringify(bookArr);
    localStorage.setItem('form', jsonData);
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  Book.addBook();
});
window.addEventListener('load', () => {
  const getJsonData = localStorage.getItem('form');
  if (getJsonData) {
    bookArr = JSON.parse(getJsonData);
  }
  Book.bookDisplay();
});

// Date

displayDate();
setInterval(displayDate, 1000);

// Navigation

listBtn.addEventListener('click', openBookList);

addBtn.addEventListener('click', openAddBook);

contactBtn.addEventListener('click', openContact);
