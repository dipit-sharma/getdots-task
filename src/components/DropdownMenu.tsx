import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import './DropdownMenu.css';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactElement;
  enabled: boolean;
  disabled?: boolean;
}

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, disabled = false }) => {
  return (
    <button
      className={`toggle-switch ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      role="switch"
      aria-checked={checked}
    >
      <span className="toggle-handle" />
    </button>
  );
};

export default function DropdownMenu({menuItems, setMenuItems, value}) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        x: rect.left,
        y: rect.bottom + window.scrollY
      });
    }
    setIsOpen(!isOpen);
  };

  const handleToggleChange = (id: string, checked: boolean) => {
    setMenuItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, enabled: checked } : item
      )
    );
  };

  return (
    <div className="dropdown-container">
      <button 
        ref={buttonRef}
        className={`settings-button ${isOpen ? 'rotated' : ''}`}
        onClick={toggleMenu}
        aria-label="Settings"
        aria-expanded={isOpen}
      >
        <SettingsIcon />
      </button>
      
      {isOpen ? createPortal(
        <div 
          className="dropdown-menu"
          style={{
            position: 'absolute',
            left: `${position.x-100}px`,
            top: `${position.y}px`,
            zIndex: 1000
          }}
        >
          {menuItems.map((item, idx) => (
            <div key={item.id} className={`menu-item ${item.disabled ? 'disabled' : ''}`}>
              <div className="menu-item-content">
                <span className={`menu-icon ${item.disabled ? 'disabled' : ''}`}>
                  {item.icon}
                </span>
                <span className={`menu-label ${item.disabled ? 'disabled' : ''}`}>
                  {item.label}
                </span>
              </div>
              <ToggleSwitch
                checked={item.enabled}
                onChange={(checked) => handleToggleChange(item.id, checked)}
                disabled={item.disabled || value === item.id}
              />
            </div>
          ))}
        </div>,
        document.body
      ) : null}
    </div>
  );
}
