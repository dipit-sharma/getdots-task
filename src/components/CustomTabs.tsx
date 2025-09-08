import { ImportContactsTwoTone } from '@mui/icons-material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PersonIcon from '@mui/icons-material/Person';
import * as React from 'react';
import './CustomTabs.css';

interface TabProps {
  label: string;
  icon?: React.ReactElement;
  iconPosition?: 'start' | 'end';
  isSelected?: boolean;
  onClick: () => void;
}

const CustomTab: React.FC<TabProps> = ({ label, icon, iconPosition = 'start', isSelected, onClick }) => {
  return (
    <button
      className={`custom-tab ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      role="tab"
      aria-selected={isSelected}
      style={{
        borderBottom: isSelected ? '2px solid black' : 'none',
        color: isSelected ? 'black' : 'rgba(0, 0, 0, 0.5)',
      }}
    >
      {icon && iconPosition === 'start' && (
        <span className="tab-icon start">{icon}</span>
      )}
      <span className="tab-label">{label}</span>
      {icon && iconPosition === 'end' && (
        <span className="tab-icon end">{icon}</span>
      )}
    </button>
  );
};

export default function CustomTabs(props: { value: number, handleChange: (newValue: number) => void }) {
    const { value, handleChange } = props;

  return (
    <div className="custom-tabs" role="tablist" aria-label="ant example">
      <div className="tabs-container">
        <CustomTab
          label="All"
          isSelected={value === 0}
          onClick={() => handleChange(0)}
        />
        <CustomTab
          label="Files"
          icon={<AttachFileIcon />}
          iconPosition="end"
          isSelected={value === 1}
          onClick={() => handleChange(1)}
        />
        <CustomTab
          label="People"
          icon={<PersonIcon />}
          iconPosition="end"
          isSelected={value === 2}
          onClick={() => handleChange(2)}
        />
      </div>
      <div className="tabs-indicator" style={{ transform: `translateX(${value * 100}%)` }} />
    </div>
  );
}