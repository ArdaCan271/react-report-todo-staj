import React, { useMemo } from 'react';
import './CustomersNew.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AiOutlineArrowRight, AiOutlineSearch, AiOutlineSync } from "react-icons/ai";
import columns from './data/columns';

import Table from './components/Table';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const CustomersNew = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const localEmail = localStorage.getItem('email');
    const localPassword = localStorage.getItem('password');

    axios.post('https://duyu.alter.net.tr/api/getTokenAndModulesOfUser',
      { email: localEmail, password: localPassword })
      .then((response) => {

      })
      .catch((error) => {
        console.error('Error during the request:', error);
        navigate('/login')
      });
  }, [navigate]);

  const onRefreshClick = () => {
    const userToken = localStorage.getItem("temp_token");
    console.log(userToken);

    axios.post('https://duyu.alter.net.tr/api/getCustomerList', {
      token: "RasyoIoToken2021",
      user_token: userToken
    })
      .then(res => {
        setCustomerDetails(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  const [searchValue, setSearchValue] = useState('');
  const [filtering, setFiltering] = useState('');
  const [sorting, setSorting] = useState([])
  const [customerDetails, setCustomerDetails] = useState({});

  const [boxesVisible, setBoxesVisible] = useState(false);

  const [visibleFilters, setVisibleFilters] = useState([]);

  const [columnFilters, setColumnFilters] = useState(
    columns.map(column => ({
      id: column.accessorKey,
      value: '',
    })));

  const [inputs, setInputs] = useState(
    columns.map(column => ({
      id: column.accessorKey,
      value: '',
    })));


  useEffect(() => {
    const timeOutId = setTimeout(() => onSearchClick(), 1500);
    return () => clearTimeout(timeOutId);
  }, [inputs]);

  console.log("inputs: ", inputs);
  console.log("columnFilters: ", columnFilters);

  const handleExpandClick = () => {
    setBoxesVisible(!boxesVisible);
  }


  const onSearchClick = () => {
    setColumnFilters(inputs)
  }

  const handleFilterInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => prevInputs.map(input =>
      input.id === name ? { ...input, value: value } : input
    ));
  }

  console.log("renderPage");

  const data = customerDetails;

  return (
    <div id='customersnew-container'>
      <div id='filters-section'>
        <div id='filters-expand-section'>
          <div id='filters-expand-button' onClick={handleExpandClick}>
            Filtreler
            {boxesVisible ?
              <FaChevronLeft style={{ marginLeft: 5 }} fontSize={10} /> :
              <FaChevronRight style={{ marginLeft: 5 }} fontSize={10} />
            }
          </div>
          {boxesVisible &&
            <div id='filters-checkboxes'>
              {columns.map((column, index) => (
                <div key={index} className='filter-checkbox-container'>
                  <form>
                    <input
                      type='checkbox'
                      className='filter-checkbox-button'
                      checked={visibleFilters.includes(column.header)}
                      onChange={() => visibleFilters.includes(column.header) ?
                        setVisibleFilters(visibleFilters.filter(item => item !== column.header)) :
                        setVisibleFilters([...visibleFilters, column.header])
                      }
                    />
                  </form>
                  <div className='filter-checkbox-title'>{column.header}</div>
                </div>
              ))}
            </div>
          }
        </div>
        <div style={{ width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center", marginBottom: 10, marginTop: 10 }}>
          <div id='filter-inputs-section'>
            {columns.map((column, index) => (
              visibleFilters.includes(column.header) ?
                <input
                  key={index}
                  type='text'
                  name={column.accessorKey}
                  className='filter-input'
                  placeholder={`${column.header}...`}
                  value={inputs.find(input => input.id === column.accessorKey)?.value || ''}
                  onChange={handleFilterInputChange}
                />
                :
                null
            ))}
          </div>
          <div
            id='filter-search-button'
            onClick={onSearchClick}
          >
            <AiOutlineSearch />
          </div>
          <div
            id='customernew-refresh-button'
            onClick={onRefreshClick}
          >
            <AiOutlineSync />
          </div>
        </div>

      </div>
      <div id='customernew-card'>
        <div id='table-container'>
          <table className='w3-table-all my-table-style'>
            <Table
              data={data}
              columns={columns}
              filtering={filtering}
              setFiltering={setFiltering}
              sorting={sorting}
              setSorting={setSorting}
              columnFilters={columnFilters}
            />
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomersNew;
