import React from 'react';
import './ExpandButton.css'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

const ExpandButton = ({boxesVisible, setBoxesVisible}) => {

  const handleOnExpandClick = () => {
    setBoxesVisible(!boxesVisible)
  }

  return (
    <div
      id={
        boxesVisible ?
          'expand-filters-button-expanded' :
          'expand-filters-button'
      }
      onClick={handleOnExpandClick}>
      Filtreler
      {boxesVisible ?
        <FaChevronDown style={{ marginLeft: 5 }} fontSize={10} /> :
        <FaChevronRight style={{ marginLeft: 5 }} fontSize={10} />
      }
    </div>
  );
}

export default ExpandButton;