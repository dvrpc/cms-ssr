import React, { useState } from 'react';

const MultiTextInput = ({ name, value, placeholder, required, className, onChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [entries, setEntries] = useState(value ? value.split(',') : []);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      if (inputValue.trim()) {
        const newEntries = [...entries, inputValue.trim()];
        setEntries(newEntries);
        setInputValue('');
        onChange({
          target: {
            name,
            value: newEntries.join(','),
          },
        });
      }
    }
  };

  const handleRemoveEntry = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
    onChange({
      target: {
        name,
        value: newEntries.join(','),
      },
    });
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {entries.map((entry, index) => (
          <div key={index} className="flex items-center bg-gray-200 rounded-full px-3 py-1">
            <span>{entry}</span>
            <button
              type="button"
              className="ml-2 text-red-500"
              onClick={() => handleRemoveEntry(index)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        name={name}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        required={required}
        className={className}
        placeholder={placeholder}
      />
    </div>
  );
};

export default MultiTextInput;
