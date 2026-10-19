import React from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { returnBook } from '../features/books/booksSlice';
import { useFilterStore } from '../stores/filterStore';
import { BookList } from '../features/books/BookList';
import { Genre } from '../types/book';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const borrowedBooks = useAppSelector((state) => state.books.borrowedBooks);
  const { searchQuery, selectedGenre, setSearchQuery, setSelectedGenre } = useFilterStore();

  return (
    <div>
      <section style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Tìm sách theo tên hoặc tác giả..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '8px', width: '280px', marginRight: '10px' }}
        />
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value as Genre | 'Tất cả')}
          style={{ padding: '8px' }}
        >
          <option value="Tất cả">Tất cả thể loại</option>
          <option value="CNTT">CNTT</option>
          <option value="Kinh tế">Kinh tế</option>
          <option value="Ngoại ngữ">Ngoại ngữ</option>
        </select>
      </section>

      <section style={{ marginBottom: '20px', padding: '12px', border: '1px dashed #aaa' }}>
        <h3>Sách bạn đang mượn ({borrowedBooks.length}/3 cuốn)</h3>
        {borrowedBooks.length === 0 ? (
          <p>Chưa mượn cuốn nào.</p>
        ) : (
          <ul>
            {borrowedBooks.map((item) => (
              <li key={item.id} style={{ margin: '6px 0' }}>
                {item.title} - {item.author} ({item.genre}){' '}
                <button onClick={() => dispatch(returnBook(item.id))}>Trả sách</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <BookList />
    </div>
  );
};