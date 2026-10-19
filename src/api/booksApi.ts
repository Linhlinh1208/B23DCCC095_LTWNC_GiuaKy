import { Book, ApiResponse } from '../types/book';

const MOCK_BOOKS: Book[] = [
  { id: 'b1', title: 'Clean Code', author: 'Robert C. Martin', genre: 'CNTT', publishYear: 2008, availableCopies: 2 },
  { id: 'b2', title: 'Design Patterns', author: 'Gang of Four', genre: 'CNTT', publishYear: 1994, availableCopies: 1 },
  { id: 'b3', title: 'Kinh tế vi mô', author: 'N. Gregory Mankiw', genre: 'Kinh tế', publishYear: 2014, availableCopies: 3 },
  { id: 'b4', title: 'English Grammar in Use', author: 'Raymond Murphy', genre: 'Ngoại ngữ', publishYear: 2019, availableCopies: 0 },
  { id: 'b5', title: 'Refactoring', author: 'Martin Fowler', genre: 'CNTT', publishYear: 2018, availableCopies: 1 }
];

export const fetchBooksApi = (shouldFail: boolean = false): Promise<ApiResponse<Book[]>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        resolve({ ok: false, error: 'Không thể kết nối đến máy chủ thư viện!' });
      } else {
        resolve({ ok: true, data: [...MOCK_BOOKS] });
      }
    }, 500);
  });
};