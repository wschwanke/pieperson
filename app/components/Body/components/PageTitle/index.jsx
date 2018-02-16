import React from 'react';

const PageTitle = ({ title, noHeader }) => {
  document.title = `Teach Habits: ${title}`;
  if (!noHeader) {
    return (
      <header className="page-header row">
        <h1 className="page-title col">{title ? title : 'Not Found'}</h1>
      </header>
    );
  }
  return null;
}

export default PageTitle;
