export interface Book {
  id: string;
  title: string;
  authors: string[];
  description: string;
  publisher?: string;
  publishedDate?: string;
  coverUrl?: string;
}

export interface Snackbar {
  id: string;
  bookId: string;
  bookTitle?: string;
  event: string;
}

export interface ReadingListItem extends Omit<Book, 'id'> {
  bookId: string;
  finished?: boolean;
  finishedDate?: string;
}
