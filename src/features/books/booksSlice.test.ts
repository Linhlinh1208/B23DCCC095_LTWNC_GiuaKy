import booksReducer, {
  borrowBook,
  returnBook,
  loadBooks,
  BooksState,
  initialState
} from './booksSlice';
import { Book } from '../../types/book';

describe('booksSlice Reducer', () => {
  const sampleBook: Book = {
    id: 'b1',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    genre: 'CNTT',
    publishYear: 2008,
    availableCopies: 2
  };

  test('Test 1: borrowBook giảm số bản còn lại và thêm vào danh sách đang mượn', () => {
    const prevState: BooksState = {
      ...initialState,
      books: [{ ...sampleBook }]
    };

    const nextState = booksReducer(prevState, borrowBook('b1'));
    expect(nextState.books[0].availableCopies).toBe(1);
    expect(nextState.borrowedBooks).toHaveLength(1);
    expect(nextState.borrowedBooks[0].id).toBe('b1');
  });

  test('Test 2: returnBook trả sách, xóa khỏi danh sách mượn và tăng số bản còn lại', () => {
    const prevState: BooksState = {
      ...initialState,
      books: [{ ...sampleBook, availableCopies: 1 }],
      borrowedBooks: [{ id: 'b1', title: 'Clean Code', author: 'Robert C. Martin', genre: 'CNTT' }]
    };

    const nextState = booksReducer(prevState, returnBook('b1'));
    expect(nextState.books[0].availableCopies).toBe(2);
    expect(nextState.borrowedBooks).toHaveLength(0);
  });

  test('Test 3: loadBooks.pending chuyển state loading thành true và xóa error', () => {
    const prevState: BooksState = {
      ...initialState,
      error: 'Lỗi cũ'
    };

    const nextState = booksReducer(prevState, { type: loadBooks.pending.type });
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  test('Test 4: loadBooks.fulfilled cập nhật danh sách sách và kết thúc loading', () => {
    const prevState: BooksState = {
      ...initialState,
      loading: true
    };

    const nextState = booksReducer(prevState, {
      type: loadBooks.fulfilled.type,
      payload: [sampleBook]
    });
    expect(nextState.loading).toBe(false);
    expect(nextState.books).toEqual([sampleBook]);
  });
});