import React from 'react';
import PropTypes from 'prop-types';

const HorizontalProgressBar = ({ sections, currentSectionIndex, highlightColor = 'bg-[var(--color-h1)]' }) => {

  return (
    <div className="flex w-full">
      {sections.map((section, index) => (
        <div
          key={index}
          className={`flex-1 h-8 flex items-center justify-center relative ${index <= currentSectionIndex ? `${highlightColor} text-white` : 'bg-gray-200 text-gray-700'} ${index < sections.length - 1 ? 'border-r border-white' : ''}`}
        >
        {/* {section.title} */}
        </div>
      ))}
    </div>
  );
};

HorizontalProgressBar.propTypes = {
  sections: PropTypes.array.isRequired,
  currentSectionIndex: PropTypes.number.isRequired,
  highlightColor: PropTypes.string
};

export default HorizontalProgressBar;
