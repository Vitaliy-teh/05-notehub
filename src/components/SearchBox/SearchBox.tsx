import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onChange: (val: string) => void;
}

export const SearchBox = ({ value, onChange }: SearchBoxProps) => (
  <input
    className={css.input}
    type="text"
    placeholder="Search notes"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);
