import React, { useEffect, useState } from 'react';
import { utils as XLSXUtils, write as writeXLSX } from 'xlsx';

const App = () => {
  const [gridData, setGridData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const savedData = localStorage.getItem('gridData');
    if (savedData) {
      setGridData(JSON.parse(savedData));
    } else {
      setGridData(generateEmptyGrid());
    }
  };

  const saveData = () => {
    localStorage.setItem('gridData', JSON.stringify(gridData));
    console.log('Data saved successfully');
  };

  const handleCellChange = (rowIndex, columnIndex, value) => {
    const updatedGridData = [...gridData];
    updatedGridData[rowIndex][columnIndex] = value;
    setGridData(updatedGridData);
  };

  const handleDownload = () => {
    const wb = XLSXUtils.book_new();
    const ws = XLSXUtils.aoa_to_sheet(gridData);
    XLSXUtils.book_append_sheet(wb, ws, 'Sheet1');
    const wbout = writeXLSX(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'spreadsheet.xlsx';
    link.click();

    saveData();
  };

  const generateEmptyGrid = () => {
    const grid = [];
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 5; j++) {
        row.push('');
      }
      grid.push(row);
    }
    return grid;
  };

  return (
    <div>
      <div className="container">
        <button onClick={handleDownload}>Download</button>
      </div>
      <div className="grid">
        {gridData.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, columnIndex) => (
              <input
                key={columnIndex}
                type="text"
                value={cell}
                onChange={(e) => handleCellChange(rowIndex, columnIndex, e.target.value)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
