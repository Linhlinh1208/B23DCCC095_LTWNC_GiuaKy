import React from 'react';
import { useAppSelector } from '../app/hooks';

const Stats: React.FC = () => {
  const { books, borrowedBooks } = useAppSelector((state) => state.books);

  const statsByGenre = books.reduce<Record<string, number>>((acc, book) => {
    acc[book.genre] = (acc[book.genre] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={{ padding: '20px' }}>
      <h2>Thống kê Thư viện</h2>
      <p>Tổng số sách đang được mượn: <strong>{borrowedBooks.length}</strong> cuốn</p>
      <h3>Số lượng đầu sách theo thể loại:</h3>
      <ul>
        <li>CNTT: {statsByGenre['CNTT'] || 0}</li>
        <li>Kinh tế: {statsByGenre['Kinh tế'] || 0}</li>
        <li>Ngoại ngữ: {statsByGenre['Ngoại ngữ'] || 0}</li>
      </ul>
    </div>
  );
};

export default Stats;