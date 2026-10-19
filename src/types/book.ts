export type Genre = 'CNTT' | 'Kinh tế' | 'Ngoại ngữ';

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: Genre;
  publishYear: number;
  availableCopies: number;
}

// Utility Type 1: Sách mượn chỉ cần một số thông tin cơ bản
export type BorrowedBook = Pick<Book, 'id' | 'title' | 'author' | 'genre'>;

// Utility Type 2: Kiểu dữ liệu bất biến khi truyền props
export type ReadonlyBook = Readonly<Book>;

// Utility Type 3: Payload tạo sách mới (nếu có mở rộng)
export type BookCreationParams = Omit<Book, 'id'>;

// Generic API Response
export interface ApiResponseSuccess<T> {
  ok: true;
  data: T;
}

export interface ApiResponseFailure {
  ok: false;
  error: string;
}

export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseFailure;

// Type Guard phân biệt 2 trường hợp
export function isApiSuccess<T>(response: ApiResponse<T>): response is ApiResponseSuccess<T> {
  return response.ok === true;
}