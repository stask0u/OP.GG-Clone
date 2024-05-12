import "./SearchBar.css";
import { useState, FormEvent } from "react";


interface SearchBarProps {
    onSubmit: (input: string) => void;
}
  

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
    const [input, setInput] = useState('');
  
    const handleSubmit = (event: FormEvent) => {
      event.preventDefault();
      onSubmit(input);
    }

  return (
    <form onSubmit={handleSubmit} className="searchPlaceholder">
      <p>fatherofsilver#qmspu</p>
      <input className="searchBar"
        type="text" 
        value={input} 
        onChange={e => setInput(e.target.value)}/>
      <button type="submit">Submit</button>
    </form>
  );
}

export default SearchBar;