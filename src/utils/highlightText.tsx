import React from 'react';

export const highlightText = (text: string, query: string): React.ReactNode => {
  if (!query.trim()) return text;
  
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  
  return parts.map((part, index) => 
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={index} className="bg-primary/20 text-primary px-0.5 rounded">
        {part}
      </mark>
    ) : (
      part
    )
  );
};