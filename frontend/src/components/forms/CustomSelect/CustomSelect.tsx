import { useState } from "react";
import Arrow from "../../../assets/Icon ionic-md-arrow-dropdown.svg";
import "./CustomSelect.css";

interface CustomSelectProps {
  value: string;
  placeholder?: string;
  options: string[];
  onSelect: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  options,
  onSelect,
  placeholder = "Выбрать",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={`custom-select-wrapper ${isOpen ? "open" : ""}`}>
      <div
        className="custom-select-selected"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value === "default" ? placeholder : value}
        <img
          src={Arrow}
          className={`dropdown-arrow ${isOpen ? "rotate" : ""}`}
          alt="arrow"
        />
      </div>

      {isOpen && (
        <div className="custom-select-options">
          {options.map((option) => (
            <div
              key={option}
              className="custom-select-option"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
