import React, { useState } from 'react';

const Grid = () => {
  const [gridData, setGridData] = useState([]);

  const handleInputChange = (rowIndex, colIndex, value) => {
    const updatedGridData = [...gridData];
    updatedGridData[rowIndex][colIndex] = value;
    setGridData(updatedGridData);
  };

  const renderGrid = () => {
    return gridData.map((row, rowIndex) => (
      <div className="row" key={rowIndex}>
        {row.map((col, colIndex) => (
          <input
            className="cell"
            key={colIndex}
            value={col}
            onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
          />
        ))}
      </div>
    ));
  };

  return <div className="container">{renderGrid()}</div>;
};

export default Grid;
