import React from 'react';

export const highlightText = (text: string, query: string): React.ReactNode => {
  if (!query.trim()) return text;
  
  // Escape special regex characters in the query to avoid crashes/regex injection
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));
  
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