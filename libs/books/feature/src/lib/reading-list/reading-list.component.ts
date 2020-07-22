import {Component, OnInit, ViewChild} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList, getAllBooks,
  getReadingList,
  ReadingListBook,
  removeFromReadingList,
  updateReadingListItem
} from '@tmo/books/data-access';
import {ReadingListItem} from "@tmo/shared/models";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})

export class ReadingListComponent implements OnInit {
  @ViewChild('finishedDate', {
    read: MatInput
  }) finishedDate: MatInput;

  readingList$ = this.store.select(getReadingList);
  flag = false;

  constructor(private store: Store) {

  }

  ngOnInit(): void {

  }

  status(item: ReadingListItem) {
    this.store.dispatch(updateReadingListItem({ item }));
    this.readingList$ = this.store.select(getReadingList);
  }

  resetDate() {
    this.finishedDate.value = '';
  }

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }
}
