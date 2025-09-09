import * as React from 'react';
import { useState } from 'react';
import { tabs } from '../constants/tabs.tsx';
import './CustomTabs.css';
import DropdownMenu from './DropdownMenu.tsx';

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

export default function CustomTabs(props: { value: string, handleChange: (newValue: string) => void }) {
  const { value, handleChange } = props;
  const [menuItems, setMenuItems] = useState(tabs);

  return (
    <div className="custom-tabs" role="tablist" aria-label="ant example">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="tabs-container">
          {menuItems.map((item, idx) => (
            item.enabled && (
              <CustomTab
                key={item.id}
                label={item.label}
                icon={item.icon}
                iconPosition="end"
                isSelected={value === item.id}
                onClick={() => handleChange(item.id)}
              />
            )
          ))}
        </div>
        <DropdownMenu value={value} menuItems={menuItems} setMenuItems={setMenuItems} />
      </div>
    </div>
  );
}