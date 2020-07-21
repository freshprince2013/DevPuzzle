import {Component, OnInit, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';
import {Book, ReadingListItem, Snackbar} from '@tmo/shared/models';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { Store } from '@ngrx/store';

@Component({
  selector: 'tmo-snack-bar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})

export class SnackbarComponent implements OnInit {
  snackbar: Snackbar = {
    id: "",
    bookId: "",
    bookTitle: "",
    event: ""
  };
  id = 0;
  readingListBooks: ReadingListBook[];
  readingList = this.store.select(getReadingList);

  constructor(private readonly fb: FormBuilder,
              private readonly store: Store,
              @Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.id++;
  }

  ngOnInit(): void {
    this.snackbar.id = this.id + "";
    this.snackbar.bookId = this.data.item.id;
    this.snackbar.bookTitle = this.data.item.title;
    this.snackbar.event = this.data.event;

    this.store.select(getAllBooks).subscribe(books => {
      this.readingListBooks = books;
    });

    console.log(this.snackbar);
  }

  undo(): void {
    console.log("Undo triggered!");

    if (this.snackbar) {
      if (this.snackbar.event.toLowerCase() === "add") {
        this.readingList.forEach((item) => {
          item.forEach( (book) => {
            if (book.bookId === this.snackbar.bookId) {
              this.removeFromReadingList(book);
              console.log("Book id #" + book.bookId + " has been successfully removed from the reading list.");
              this.resetSnackbar();
            }
          });
        });
      } else {
        this.readingListBooks.forEach((book) => {
            if (book.id === this.snackbar.bookId) {
              this.addBookToReadingList(book);
              console.log("Book id #" + book.id + " has been successfully added to the reading list.");
              this.resetSnackbar();
            }
        });
      }
    }
  }

  resetSnackbar() {
    this.snackbar.id = "";
    this.snackbar.bookId = "";
    this.snackbar.bookTitle = "";
    this.snackbar.event = "undone";
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }
}
