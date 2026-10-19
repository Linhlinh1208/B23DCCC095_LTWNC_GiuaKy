import { configureStore, Middleware } from '@reduxjs/toolkit';
import booksReducer, { borrowBook, setWarningMessage } from '../features/books/booksSlice';

// Middleware kiểm tra sinh viên chỉ được mượn tối đa 3 cuốn
export const borrowLimitMiddleware: Middleware = (storeApi) => (next) => (action: any) => {
  if (borrowBook.match(action)) {
    const state = storeApi.getState();
    const currentBorrowedCount = state.books.borrowedBooks.length;

    if (currentBorrowedCount >= 3) {
      storeApi.dispatch(setWarningMessage('Mỗi sinh viên chỉ được mượn tối đa 3 cuốn sách cùng lúc!'));
      return; // Chặn action borrowBook tiếp tục dispatch
    }
  }
  return next(action);
};

export const store = configureStore({
  reducer: {
    books: booksReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(borrowLimitMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;