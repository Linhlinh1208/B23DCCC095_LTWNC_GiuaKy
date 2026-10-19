export type Genre = 'CNTT' | 'Kinh tế' | 'Ngoại ngữ';

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: Genre;
  publishYear: number;
  availableCopies: number;
}

export type BorrowedBook = Pick<Book, 'id' | 'title' | 'author' | 'genre'>;

export type ReadonlyBook = Readonly<Book>;

export type BookCreationParams = Omit<Book, 'id'>;

export interface ApiResponseSuccess<T> {
  ok: true;
  data: T;
}

export interface ApiResponseFailure {
  ok: false;
  error: string;
}

export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseFailure;

export function isApiSuccess<T>(response: ApiResponse<T>): response is ApiResponseSuccess<T> {
  return response.ok === true;
}