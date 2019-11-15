import React from 'react';

const ColumnPlaceholder = ({ text = '', type }) => {
  if (type === 'summary') {
    if (type) {
      const string = text.toString();
      const positive = string.replace('-', '');
      return (
        <span>{positive || positive === 0 ? positive : '-'}</span>
      );

    }
  }
  else {
    return (
      <span>{text || text === 0 ? text : '-'}</span>
    )
    ;
  }
};

export default ColumnPlaceholder;
