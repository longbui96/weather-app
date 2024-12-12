import React, {
  HTMLAttributes,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrow.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";

import "./index.css";

export interface ISuggestionItem {
  label: string;
  value: string | number | null;
}

export interface ISearchBoxProps {
  placeholder: string;
  onSearch: (input: string) => void;
  getSuggestions: (input: string) => Promise<ISuggestionItem[]>;
  initValue?: string;
}

const SearchBox: React.FC<
  Partial<HTMLAttributes<HTMLInputElement> & ISearchBoxProps>
> = ({
  placeholder,
  onSearch,
  getSuggestions,
  className = "",
  initValue = "",
  ...restProps
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [suggestions, setSuggestions] = useState<ISuggestionItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = initValue;
    }
  }, [initValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchSuggestions = useCallback(
    async (searchValue: string) => {
      const responseData = await getSuggestions?.(searchValue);
      setSuggestions(responseData || []);
    },
    [getSuggestions]
  );

  const handleSuggestionClick = (suggestion: ISuggestionItem) => {
    if (inputRef.current) {
      inputRef.current.value = suggestion.label;
      fetchSuggestions(suggestion.label);
      onSearch && onSearch(suggestion.label);
    }
    setShowSuggestions(false);
  };

  return (
    <div ref={containerRef} className={`SearchBox ${className}`} {...restProps}>
      <input
        ref={inputRef}
        className="SearchBox-Input"
        placeholder={placeholder}
        defaultValue={initValue}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onSearch && onSearch(event.currentTarget.value);
          }
        }}
        onChange={(event) => {
          fetchSuggestions(event.currentTarget.value);
          setShowSuggestions(true);
        }}
      />
      {getSuggestions ? (
        <ArrowIcon
          className={`SearchBox-Icon ${
            showSuggestions ? "ArrowUp" : "ArrowDown"
          }`}
          width={16}
          height={16}
          onClick={() => setShowSuggestions((prev) => !prev)}
        />
      ) : (
        <SearchIcon className="SearchBox-Icon" width={20} height={20} />
      )}

      {showSuggestions && (
        <div className="SearchBox-Suggestions">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.label}
              className="SearchBox-Suggestions-Items noselect"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <span>{suggestion.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
