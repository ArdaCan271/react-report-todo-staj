import React from 'react';
import './Inputs.css';

const Inputs = ({ columns, visibleFilters, inputs, setInputs }) => {

  const handleFilterInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => prevInputs.map(input =>
      input.id === name ? { ...input, value: value } : input
    ));
  }

  return (
    <div id='products-filter-inputs-section'>
        {columns.map((column, index) => (
          visibleFilters.includes(column.header) ?
            <input
              key={index}
              type='text'
              name={column.accessorKey}
              className='products-filter-input'
              placeholder={`${column.header}...`}
              value={inputs.find(input => input.id === column.accessorKey)?.value || ''}
              onChange={handleFilterInputChange}
            />
            :
            null
        ))}
    </div>
  );
}

export default Inputs;