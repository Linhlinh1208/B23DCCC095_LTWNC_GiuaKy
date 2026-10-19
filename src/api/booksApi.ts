import { Book, ApiResponse } from '../types/book';

const MOCK_BOOKS: Book[] = [
  {
    id: 'b1',
    title: 'Giáo trình Chuyên ngành A',
    author: 'Nguyễn Văn A',
    genre: 'CNTT',
    publishYear: 2023,
    availableCopies: 3
  },
  {
    id: 'b2',
    title: 'Kỹ thuật Lập trình B',
    author: 'Trần Thị B',
    genre: 'CNTT',
    publishYear: 2021,
    availableCopies: 1
  },
  {
    id: 'b3',
    title: 'Nguyên lý Quản trị C',
    author: 'Lê Văn C',
    genre: 'Kinh tế',
    publishYear: 2020,
    availableCopies: 4
  },
  {
    id: 'b4',
    title: 'Phân tích Tài chính D',
    author: 'Phạm Thị D',
    genre: 'Kinh tế',
    publishYear: 2022,
    availableCopies: 2
  },
  {
    id: 'b5',
    title: 'Tiếng Anh Chuyên ngành E',
    author: 'Hoàng Văn E',
    genre: 'Ngoại ngữ',
    publishYear: 2024,
    availableCopies: 2
  },
  {
    id: 'b6',
    title: 'Giao tiếp Ngoại ngữ F',
    author: 'Vũ Thị F',
    genre: 'Ngoại ngữ',
    publishYear: 2023,
    availableCopies: 0 
  }
];

export const fetchBooksApi = (shouldFail: boolean = false): Promise<ApiResponse<Book[]>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (shouldFail) {
        resolve({ ok: false, error: 'Không thể kết nối đến máy chủ thư viện của khoa!' });
      } else {
        resolve({ ok: true, data: [...MOCK_BOOKS] });
      }
    }, 500);
  });
};