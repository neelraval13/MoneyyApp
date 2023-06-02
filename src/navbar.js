import React from 'react';

const Navbar = ({ handleDownload }) => {
  return (
    <div className="container">
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Navbar;
