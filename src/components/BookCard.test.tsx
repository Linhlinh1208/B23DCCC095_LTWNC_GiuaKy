import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookCard } from '../features/books/BookCard';
import { Book } from '../types/book';

const mockBook: Book = {
  id: 'b1',
  title: 'Giáo trình Chuyên ngành A',
  author: 'Nguyễn Văn A',
  genre: 'CNTT',
  publishYear: 2023,
  availableCopies: 1
};

describe('BookCard Component', () => {
  test('Test 1: Hiển thị đầy đủ thông tin sách chính xác', () => {
    render(<BookCard book={mockBook} onBorrow={jest.fn()} />);

    expect(screen.getByText('Giáo trình Chuyên ngành A')).toBeInTheDocument();
    expect(screen.getByText(/Nguyễn Văn A/)).toBeInTheDocument();
    expect(screen.getByText(/CNTT/)).toBeInTheDocument();
    expect(screen.getByTestId('copies-b1')).toHaveTextContent('1');
  });

  test('Test 2: Click nút "Mượn sách" kích hoạt đúng callback với id cuốn sách', async () => {
    const mockOnBorrow = jest.fn();
    render(<BookCard book={mockBook} onBorrow={mockOnBorrow} />);

    const borrowBtn = screen.getByRole('button', { name: /Mượn sách/i });
    await userEvent.click(borrowBtn);

    expect(mockOnBorrow).toHaveBeenCalledTimes(1);
    expect(mockOnBorrow).toHaveBeenCalledWith('b1');
  });

  test('Test 3: Nút bị vô hiệu hoá (disabled) khi số bản còn lại bằng 0', () => {
    const outOfStockBook: Book = { ...mockBook, availableCopies: 0 };
    render(<BookCard book={outOfStockBook} onBorrow={jest.fn()} />);

    const borrowBtn = screen.getByRole('button', { name: /Đã hết sách/i });
    expect(borrowBtn).toBeDisabled();
  });
});