import SearchIcon from '@mui/icons-material/Search';
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import { Accordion, AccordionDetails, AccordionSummary, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce.ts";
import CustomTabs from "./CustomTabs.tsx";
import "./SearchBar.css";
import { lists } from '../constants/lists.ts';

export default function SearchWithTabs() {
  const [expanded, setExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const [value, setValue] = React.useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
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
    <div className="container">
      <Accordion style={{
        border: "none",
        width: "500px",
        borderRadius: "20px",
        padding: "5px",
      }}
        expanded={expanded}
        onClick={() => { }}
      >
        <AccordionSummary
          expandIcon={debouncedSearchValue.length ? <div style={{ transform: "rotate(180deg)" }} onClick={() => setSearchValue("")}>Clear</div> : <SmartButtonIcon />}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}>
            <SearchIcon style={{ color: "gray" }} />
          </div>
          <TextField
            placeholder="Search is easier"
            component="span"
            value={searchValue}
            onChange={handleSearchChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                },
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
                '&.Mui-focused': {
                  backgroundColor: 'transparent',
                },
              },
              '& .MuiInputBase-input': {
                outline: 'none',
                backgroundColor: 'transparent',
                '&:focus': {
                  backgroundColor: 'transparent',
                },
              }
            }}
          />
        </AccordionSummary>
        <AccordionDetails>
            <CustomTabs value={value} handleChange={handleChange} />
            <div className="list">
                {lists[value].map((item) => (
                    <div className="item">
                        <div>
                          <img src={item.thumbnail} alt={item.name} />
                        </div>
                        <div>
                          <div>{item.name}</div>
                          <div>{item.subTitle}</div>
                        </div>
                        <div></div>
                    </div>
                ))}
            </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
