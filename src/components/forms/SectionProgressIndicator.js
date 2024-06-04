import React from 'react';

const SectionProgressIndicator = ({ sections, currentSectionIndex }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Section Progress</h3>
      <ul>
        {sections.map((section, index) => (
          <li key={index} className={index === currentSectionIndex ? 'font-bold' : ''}>
            {section.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionProgressIndicator;
