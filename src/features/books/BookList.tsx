import React, { useMemo, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { borrowBook } from './booksSlice';
import { useFilterStore } from '../../stores/filterStore';
import { useDebounce } from '../../hooks/useDebounce';
import { BookCard } from './BookCard';

export const BookList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { books, loading, error, warningMessage } = useAppSelector((state) => state.books);
  const { searchQuery, selectedGenre } = useFilterStore();

  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchGenre = selectedGenre === 'Tất cả' || book.genre === selectedGenre;
      const lowerQuery = debouncedSearch.toLowerCase().trim();
      const matchSearch =
        book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery);
      return matchGenre && matchSearch;
    });
  }, [books, debouncedSearch, selectedGenre]);

  const handleBorrow = useCallback(
    (id: string) => {
      dispatch(borrowBook(id));
    },
    [dispatch]
  );

  if (loading) return <div>Đang tải danh sách sách...</div>;
  if (error) return <div style={{ color: 'red' }}>Lỗi: {error}</div>;

  return (
    <div>
      {warningMessage && (
        <div style={{ background: '#ffebee', color: '#c62828', padding: '10px', marginBottom: '10px' }}>
          {warningMessage}
        </div>
      )}
      <div>
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} onBorrow={handleBorrow} />
        ))}
      </div>
    </div>
  );
};