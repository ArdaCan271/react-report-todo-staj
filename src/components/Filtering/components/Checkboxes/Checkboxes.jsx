import React from 'react';
import './Checkboxes.css';


const Checkboxes = ({ columns, visibleFilters, setVisibleFilters}) => {

  return (
    <div id='products-filters-checkboxes'>
      {columns.map((column, index) => (
        <div key={index} className='products-filter-checkbox-container'>
          <form>
            <input
              type='checkbox'
              className='products-filter-checkbox-button'
              checked={visibleFilters.includes(column.header)}
              onChange={() => visibleFilters.includes(column.header) ?
                setVisibleFilters(visibleFilters.filter(item => item !== column.header)) :
                setVisibleFilters([...visibleFilters, column.header])
              }
            />
          </form>
          <div>{column.header}</div>
        </div>
      ))}
    </div>
  );
}

export default Checkboxes;