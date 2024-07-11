import React, { useState } from 'react';
import './Filtering.css';

import ExpandButton from './components/ExpandButton/ExpandButton';
import ClearAllButton from './components/ClearAllButton/ClearAllButton';
import Checkboxes from './components/Checkboxes/Checkboxes';
import Inputs from './components/Inputs/Inputs';

const Filtering = ({ columns }) => {

  const [boxesVisible, setBoxesVisible] = useState(false);
  const [visibleFilters, setVisibleFilters] = useState([]);
  const [inputs, setInputs] = useState(
    columns.map(column => ({
      id: column.accessorKey,
      value: '',
    })));

  return (
    <div id='products-filters-section'>
      <div id='products-filters-expand-section'>
        <div id='products-filters-expand-and-remove'>
          <ExpandButton boxesVisible={boxesVisible} setBoxesVisible={setBoxesVisible} />
          {boxesVisible &&
            <ClearAllButton setInputs={setInputs} setVisibleFilters={setVisibleFilters} columns={columns} />
          }
        </div>
        {boxesVisible &&
          <Checkboxes columns={columns} visibleFilters={visibleFilters} setVisibleFilters={setVisibleFilters}/>
        }
      </div>
      <Inputs columns={columns} visibleFilters={visibleFilters} inputs={inputs} setInputs={setInputs}/>
    </div>
  );
}

export default Filtering;