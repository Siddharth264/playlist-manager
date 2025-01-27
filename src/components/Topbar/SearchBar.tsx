import { Search } from 'lucide-react';

type SearchBarProps = {
    placeholder: string;
}

export const SearchBar = ({ placeholder }: SearchBarProps) => (
  <div className="relative">
    <input
      type="text"
      placeholder={placeholder}
      className="bg-gray-800 rounded-lg px-4 py-2 w-64"
    />
    <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
  </div>
);