import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})

export class BookSearchComponent implements OnInit {
  books: ReadingListBook[];
  time:number = 0;
  timeThreshold:number = 500; // only one request can be sent every 500 ms
  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  dispatch() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({term: this.searchTerm}));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  searchBooks() {
    let date:Date = new Date();
    let timeDifference:number = date.getTime() - this.time;

    if ( this.searchForm.dirty ) {
      if ( this.time === 0 ) {
        console.log(timeDifference);

        this.time = date.getTime();
        this.dispatch();
      } else {
        if ( date.getTime() - this.time >= this.timeThreshold ) {
          console.log(timeDifference);

          this.time = date.getTime();
          this.dispatch();
        }
      }
    }
  }
}
