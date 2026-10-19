import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce Hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('giá trị chỉ cập nhật sau khi hết thời gian delay', () => {
    const { result, rerender } = renderHook(({ val, delay }) => useDebounce(val, delay), {
      initialProps: { val: 'ban dau', delay: 300 }
    });

    expect(result.current).toBe('ban dau');
    rerender({ val: 'thay doi', delay: 300 });

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current).toBe('ban dau');

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe('thay doi');
  });
});