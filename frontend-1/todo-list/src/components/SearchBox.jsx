import React from "react";

const SearchBox = ({ handleSearch }) => {
  return (
    <div className="w-4/5 h-9">
      <input
        type="text"
        className="w-full h-full rounded p-3 bg-white"
        placeholder="Search..."
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBox;
