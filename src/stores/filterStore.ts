import { create } from 'zustand';
import { Genre } from '../types/book';

interface FilterState {
  searchQuery: string;
  selectedGenre: Genre | 'Tất cả';
  setSearchQuery: (query: string) => void;
  setSelectedGenre: (genre: Genre | 'Tất cả') => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  searchQuery: '',
  selectedGenre: 'Tất cả',
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedGenre: (genre) => set({ selectedGenre: genre })
}));