import React from 'react';
import { ReadonlyBook } from '../../types/book';

interface BookCardProps {
  book: ReadonlyBook;
  onBorrow: (id: string) => void;
}

export const BookCard: React.FC<BookCardProps> = React.memo(({ book, onBorrow }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', margin: '8px 0' }}>
      <h3>{book.title}</h3>
      <p>Tác giả: <strong>{book.author}</strong></p>
      <p>Thể loại: {book.genre} | Năm XB: {book.publishYear}</p>
      <p>Số bản còn lại: <span data-testid={`copies-${book.id}`}>{book.availableCopies}</span></p>
      <button
        disabled={book.availableCopies === 0}
        onClick={() => onBorrow(book.id)}
      >
        {book.availableCopies === 0 ? 'Đã hết sách' : 'Mượn sách'}
      </button>
    </div>
  );
});

BookCard.displayName = 'BookCard';