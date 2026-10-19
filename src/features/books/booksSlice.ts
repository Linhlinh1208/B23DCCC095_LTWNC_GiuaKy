import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Book, BorrowedBook, isApiSuccess } from '../../types/book';
import { fetchBooksApi } from '../../api/booksApi';

export interface BooksState {
  books: Book[];
  borrowedBooks: BorrowedBook[];
  loading: boolean;
  error: string | null;
  warningMessage: string | null;
}

export const initialState: BooksState = {
  books: [],
  borrowedBooks: [],
  loading: false,
  error: null,
  warningMessage: null
};

export const loadBooks = createAsyncThunk<Book[], boolean | undefined, { rejectValue: string }>(
  'books/loadBooks',
  async (shouldFail = false, { rejectWithValue }) => {
    const res = await fetchBooksApi(shouldFail);
    if (isApiSuccess(res)) {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    borrowBook: (state, action: PayloadAction<string>) => {
      const bookId = action.payload;
      const target = state.books.find((b) => b.id === bookId);
      if (target && target.availableCopies > 0) {
        target.availableCopies -= 1;
        state.borrowedBooks.push({
          id: target.id,
          title: target.title,
          author: target.author,
          genre: target.genre
        });
        state.warningMessage = null;
      }
    },
    returnBook: (state, action: PayloadAction<string>) => {
      const bookId = action.payload;
      const idx = state.borrowedBooks.findIndex((b) => b.id === bookId);
      if (idx !== -1) {
        state.borrowedBooks.splice(idx, 1);
        const target = state.books.find((b) => b.id === bookId);
        if (target) {
          target.availableCopies += 1;
        }
        state.warningMessage = null;
      }
    },
    setWarningMessage: (state, action: PayloadAction<string | null>) => {
      state.warningMessage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(loadBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Đã có lỗi xảy ra';
      });
  }
});

export const { borrowBook, returnBook, setWarningMessage } = booksSlice.actions;
export default booksSlice.reducer;