class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this.state = 100;
    this.type = null;
  }

  get state() {
    return this._state;
  }

  set state(value) {
    this._state = Math.max(0, Math.min(100, value));
  }

  fix() {
    this.state *= 1.5;
  }
}

class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.type = 'magazine';
  }
}

class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = 'book';
  }
}

class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'novel';
  }
}

class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'fantastic';
  }
}

class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'detective';
  }
}

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    if (book.state > 30) {
      this.books.push(book);
    }
  }

  findBookBy(type, value) {
    return this.books.find(function (book) {
      return book[type] === value;
    }) || null;
  }

  giveBookByName(bookName) {
    const index = this.books.findIndex(function (book) {
      return book.name === bookName;
    });

    if (index === -1) {
      return null;
    }

    return this.books.splice(index, 1)[0];
  }
}

// Проверка выдачи, восстановления и возврата книги в библиотеку.
function testLibrary() {
  const library = new Library('Городская библиотека');
  library.addBook(new NovelBook('Джон Рид', 'Десять дней, которые потрясли мир', 1919, 350));
  library.addBook(new FantasticBook('Герберт Уэллс', 'Машина времени', 1895, 138));
  library.addBook(new Magazine('Мурзилка', 1924, 60));

  const book = library.findBookBy('releaseDate', 1919);
  const borrowedBook = library.giveBookByName(book.name);
  borrowedBook.state = 40;
  borrowedBook.fix();
  library.addBook(borrowedBook);

  return library.books.includes(borrowedBook);
}

testLibrary();

// Дополнительное задание.
class Student {
  constructor(name) {
    this.name = name;
    this.marks = {};
  }

  addMark(mark, subject) {
    if (!Number.isInteger(mark) || mark < 2 || mark > 5) {
      return;
    }

    if (!Object.hasOwn(this.marks, subject)) {
      this.marks[subject] = [];
    }

    this.marks[subject].push(mark);
  }

  getAverageBySubject(subject) {
    if (!Object.hasOwn(this.marks, subject)) {
      return 0;
    }

    const marks = this.marks[subject];
    const sum = marks.reduce(function (total, mark) {
      return total + mark;
    }, 0);

    return sum / marks.length;
  }

  getAverage() {
    const subjects = Object.keys(this.marks);

    if (subjects.length === 0) {
      return 0;
    }

    const sum = subjects.reduce((total, subject) => {
      return total + this.getAverageBySubject(subject);
    }, 0);

    return sum / subjects.length;
  }
}
