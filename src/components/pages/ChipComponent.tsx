import React, {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import Input from "../common/Input";
import { ChipProps } from "../../interfaces/Chip.interface";

const ChipComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [chips, setChips] = useState<ChipProps[]>([]);
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [highlightedChip, setHighlightedChip] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: string[] = ["John Doe", "Jane Doe", "Alice", "Bob"];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() === "") {
      setFilteredItems([]);
    } else {
      const filtered = items.filter(
        (item) =>
          !chips.find((chip) => chip.label === item) &&
          item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  };

  const handleInputClick = () => {
    setFilteredItems(
      items.filter((item) => !chips.find((chip) => chip.label === item))
    );
  };

  const addChip = (label: string) => {
    if (filteredItems.includes(label)) {
      const newChips: ChipProps[] = [...chips, { id: chips.length + 1, label }];
      setChips(newChips);
      setInputValue("");
      setFilteredItems(
        items.filter(
          (item) => !newChips.map((chip) => chip.label).includes(item)
        )
      );
      setHighlightedChip(null);
    }
  };

  const removeChip = (id: number) => {
    const removedChip = chips.find((chip) => chip.id === id);

    const updatedChips = chips.filter((chip) => chip.id !== id);
    setChips(updatedChips);

    // Only add the removed chip back to the list if it doesn't already exist
    if (!filteredItems.includes(removedChip?.label || "")) {
      setFilteredItems([...filteredItems, removedChip?.label || ""]);
    }
  };

  const removeLastChip = () => {
    if (chips.length > 0) {
      const lastChip = chips[chips.length - 1];
      setHighlightedChip(lastChip.id);
      if (highlightedChip === lastChip.id) {
        removeChip(lastChip.id);
        setHighlightedChip(null);
      }
    }
  };

  const handleBackspace = () => {
    if (inputValue === "" && chips?.length > 0) {
      removeLastChip();
    }
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      addChip(inputValue.trim());
    } else if (e.key === "Backspace") {
      handleBackspace();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [chips]);

  return (
    <div className="chip-input-container">
      <div className="chips-container">
        {chips?.map((chip) => (
          <div
            key={chip.id}
            className={`chip ${
              highlightedChip === chip.id ? "highlighted" : ""
            }`}
            onClick={() => setHighlightedChip(chip.id)}
          >
            {chip.label}
            <span className="remove-icon" onClick={() => removeChip(chip.id)}>
              X
            </span>
          </div>
        ))}
        {/* </div> */}
        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
          onKeyDown={handleInputKeyDown}
          placeholder="Type to filter..."
          inputClassName="search-input"
        />
      </div>
      {filteredItems.length > 0 && (
        <div className="filtered-list">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="filtered-item"
              onClick={() => addChip(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChipComponent;
