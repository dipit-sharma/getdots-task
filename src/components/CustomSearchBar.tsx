import SearchIcon from '@mui/icons-material/Search';
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import React, { useEffect, useRef, useState } from "react";
import { lists } from '../constants/lists.ts';
import { useDebounce } from "../hooks/useDebounce.ts";
import CustomTabs from "./CustomTabs.tsx";
import "./CustomSearchBar.css";

export default function CustomSearchBar() {
  const [expanded, setExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const [value, setValue] = React.useState("all");
  const listRef = useRef<HTMLDivElement>(null);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleClear = () => {
    setSearchValue("");
  };

  useEffect(() => {
    if (debouncedSearchValue.length) {
      setExpanded(true);
    }
    else {
      setExpanded(false);
    }
  }, [debouncedSearchValue]);

  return (
    <div className="custom-container">
      <div className={`custom-accordion ${expanded ? 'expanded' : 'collapsed'}`}>
        <div className="custom-accordion-summary">
          <div className="search-icon-container">
            <SearchIcon className="search-icon" />
          </div>
          <input
            type="text"
            placeholder="Search is easier"
            value={searchValue}
            onChange={handleSearchChange}
            className="search-input"
          />
          <div className="expand-icon-container">
            {debouncedSearchValue.length ? (
              <button 
                className="clear-button"
                onClick={handleClear}
              >
                Clear
              </button>
            ) : (
              <SmartButtonIcon className="smart-button-icon" />
            )}
          </div>
        </div>
        
        {expanded && (
          <div className="custom-accordion-details">
            <div className="tabs-container">
              <CustomTabs value={value} handleChange={handleChange} />
            </div>
            <div ref={listRef} className="list">
              {lists[value].map((item, index) => (
                <div key={index} className="item">
                  <div className="item-content">
                    <div className="thumbnail-container">
                      {item.type !== "person" ? (
                        <img 
                          className="thumbnail-image" 
                          src={item.thumbnail} 
                          alt={item.name} 
                        />
                      ) : (
                        <div 
                          className="person-thumbnail"
                          style={{ 
                            backgroundImage: `url(${item.thumbnail})`,
                          }} 
                        />
                      )}
                    </div>
                    <div className="item-text">
                      <div className='title'>{item.name}</div>
                      <div className='subTitle'>{item.subTitle}</div>
                    </div>
                  </div>
                  <div className="link-icon-container">
                    <InsertLinkIcon className="link-icon" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
