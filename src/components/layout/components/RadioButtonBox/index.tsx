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
    filters.forEach((item) => {
      if (item === filter) {
        item.isChecked = isChecked;
      }
    });
    setFilters([...filters]);
  };

  return (
    <div className="radio-box-container">
      <span className="radio-box" onClick={() => setIsOpen((prev) => !prev)}>
        {titleString}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
        <div className={`radio-box-content ${isOpen ? "open-radio-box-content" : ""}`}>
          {filters.map((filter: any, index: number) => (
            <label className="radio-box-container" key={index}>
              <div className="flex gap-2">
                <p className="w-max">{filter.stringDescription || filter}</p>
                <div>
                  {renderHeader && renderHeader(filter)}
                </div>
              </div>
              <input
                type="checkbox"
                onChange={(e) => handleFilterChange(filter, e.target.checked)}
                checked={filter.isChecked}
              />
              <span className="checkmark"></span>
            </label>
          ))}
        </div>
      </span>
    </div>
  );
};

export default RadioButtonBox;
