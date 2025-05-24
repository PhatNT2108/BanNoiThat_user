import { useState } from "react";
import "./style.css";

type CustomRendererProps = {
  titleString: string;
  renderHeader?: (filter: any) => JSX.Element;
  filters: any[];
  setFilters: React.Dispatch<React.SetStateAction<any[]>>;
};

const RadioButtonBox: React.FC<CustomRendererProps> = ({ titleString, renderHeader, filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (filter: any, isChecked: boolean) => {
    console.log("Filter changed:", filter, isChecked);
    filters.forEach((item) => {
      if (item === filter) {
        item.isChecked = isChecked;
      }
    });
    setFilters([...filters]);
  };

  return (
    <div className="radio-box-container">
      <span className="radiobox-title" onClick={() => setIsOpen((prev) => !prev)}>
        {titleString}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </span>
      <div className={`radio-box-content ${isOpen ? "open-radio-box-content" : ""}`}>
        {filters.map((filter: any, index: number) => (
          <label className="radio-box-item" key={index}>
            <span className="radio-box-label flex gap-2" >
              <p>{filter.stringDescription || filter}</p>
              <div>
                {renderHeader && renderHeader(filter)}
              </div>
            </span>
            <input
              type="checkbox"
              onChange={(e) => {
                console.log("Checkbox changed:", filter, e.target.checked);
                handleFilterChange(filter, e.target.checked)
              }}
              checked={filter.isChecked}
              className="radio-box-input"
            />
            <span className="checkmark"></span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioButtonBox;
