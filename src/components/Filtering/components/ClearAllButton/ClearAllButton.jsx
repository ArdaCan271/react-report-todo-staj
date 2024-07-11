import React from 'react';
import './ClearAllButton.css'
import { PiTrash } from 'react-icons/pi';

const ClearAllButton = ({ setInputs, setVisibleFilters, columns}) => {

  const handleClearFiltersClick = () => {
    setInputs(columns.map(column => ({
      id: column.accessorKey,
      value: '',
    })));
    setVisibleFilters([]);
  }

  return (
    <div
      className='clear-all-filters-button'
      onClick={handleClearFiltersClick}
    >
      <PiTrash style={{ marginRight: 5, color: "darkred" }} /> Tümünü Kaldır
    </div>
  );
}

export default ClearAllButton;