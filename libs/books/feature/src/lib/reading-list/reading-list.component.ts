import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { Book } from "@tmo/shared/models";
import { SnackbarComponent } from "../snackbar/snackbar.component";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store,
              private _snackbar: MatSnackBar) { }

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    this.openSnackBar(item);
  }

  openSnackBar(book: Book) {
    this._snackbar.openFromComponent(SnackbarComponent, {
      data: {
        item: book,
        event: 'remove'
      }
    });
  }
}
