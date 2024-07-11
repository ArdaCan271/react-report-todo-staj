import React from 'react';
import './Products.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import HomeButton from '../../components/HomeButton/HomeButton';
import Filtering from '../../components/Filtering/Filtering';

import { AiFillX, AiOutlineArrowLeft, AiOutlineSearch, AiOutlineSync } from "react-icons/ai";
import columns from './data/columns';

import ProductsTable from './components/ProductsTable';
import { FaChevronRight, FaChevronLeft, FaChevronDown } from 'react-icons/fa';

import Pagination from './components/Pagination';
import { PiTrash } from 'react-icons/pi';

const Products = () => {
  const navigate = useNavigate();

  // done--------------------------------------//
  const [boxesVisible, setBoxesVisible] = useState(false);
  const [visibleFilters, setVisibleFilters] = useState([]);
  const handleClearFiltersClick = () => {     //
    setInputs(columns.map(column => ({        //
      id: column.accessorKey,                 //
      value: '',                              //
    })))                                      //
    setVisibleFilters([])                     //
  }                                           //
  const [inputs, setInputs] = useState(
    columns.map(column => ({
      id: column.accessorKey,
      value: '',
    }))
  );
  //------------------------------------------//

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

    const userToken = localStorage.getItem("temp_token");
    setRefreshDisabled(true);

    axios.post('https://duyu.alter.net.tr/api/GetWarehousesStocks', {
      token: "RasyoIoToken2021",
      user_token: userToken
    })
      .then(res => {
        setProductsDetails(res.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setRefreshDisabled(false);
        setTableVisible(true)
      })
  }, [navigate]);

  const onRefreshClick = () => {
    const userToken = localStorage.getItem("temp_token");
    setRefreshDisabled(true);
    setTableVisible(false)

    axios.post('https://duyu.alter.net.tr/api/GetWarehousesStocks', {
      token: "RasyoIoToken2021",
      user_token: userToken
    })
      .then(res => {
        setProductsDetails(res.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setRefreshDisabled(false);
        setTableVisible(true)
      })
  }

  const [showDetail, setShowDetail] = useState({
    reportStyle: "calc(100% - 30px)",
    detailVisible: false
  });
  const [productCode, setProductCode] = useState('')
  const [productData, setProductData] = useState({ "hello": "hi" })

  const [productsDetails, setProductsDetails] = useState({});

  useEffect(() => {
    const userToken = localStorage.getItem("temp_token");

    axios.post('https://duyu.alter.net.tr/api/getProductDetail', {
      token: "RasyoIoToken2021",
      user_token: userToken,
      ProductId: productCode
    })
      .then(res => {
        setProductData(res.data[0]);
        if (productCode !== "") {
          handleShowDetailClick(false);
        }

      })
      .catch(err => {
        console.log(err);
      })
  }, [productCode])

  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([]);

  const data = productsDetails;

  const [refreshDisabled, setRefreshDisabled] = useState(false);

  useEffect(() => {
    const timeOutId = setTimeout(() => onSearchClick(), 1500);
    return () => clearTimeout(timeOutId);
  }, [inputs]);


  const handleFilterInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => prevInputs.map(input =>
      input.id === name ? { ...input, value: value } : input
    ));
  }

  const handleExpandFiltersClick = () => {
    setBoxesVisible(!boxesVisible);
  }


  const onSearchClick = () => {
    const nonEmptyFilters = inputs.filter(input => input.value !== '');
    setColumnFilters(nonEmptyFilters);
  }

  const handleShowDetailClick = (toggle) => {
    if (toggle) {
      setShowDetail({
        reportStyle: !showDetail.detailVisible ? 'calc(70% - 30px)' : 'calc(100% - 30px)',
        detailVisible: !showDetail.detailVisible,
      });
    } else {
      setShowDetail({
        reportStyle: 'calc(70% - 30px)',
        detailVisible: true,
      });
    }
  }


  const [tableState, setTableState] = useState(null);
  const [tablePageIndex, setTablePageIndex] = useState(0);
  const [tablePageCount, setTablePageCount] = useState(0);


  const [tableVisible, setTableVisible] = useState(false);

  console.log("renderPage");

  return (
    <div id='products-page-container'>
      <HomeButton />
      <div id='products-report-container' style={{ width: showDetail.reportStyle }}>
        <div id='products-filters-section'>
          <div id='products-filters-expand-section'>
            <div id='products-filters-expand-and-remove'>
              <div id={boxesVisible ? 'products-filters-expand-button-expanded' : 'products-filters-expand-button'} onClick={() => handleExpandFiltersClick()}>
                Filtreler
                {boxesVisible ?
                  <FaChevronDown style={{ marginLeft: 5 }} fontSize={10} /> :
                  <FaChevronRight style={{ marginLeft: 5 }} fontSize={10} />
                }
              </div>
              {boxesVisible &&
                <div
                  className='remove-all-filters'
                  onClick={handleClearFiltersClick}
                >
                  <PiTrash style={{ marginRight: 5, color: "darkred" }} /> Tümünü Kaldır
                </div>
              }
            </div>
            {boxesVisible &&
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
                    <div className='products-filter-checkbox-title'>{column.header}</div>
                  </div>
                ))}
              </div>
            }
          </div>
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
        </div>
        <div id='products-card'>
          <ProductsTable
            data={data}
            columns={columns}
            sorting={sorting}
            setSorting={setSorting}
            columnFilters={columnFilters}
            setProductCode={setProductCode}
            setTableState={setTableState}
            setTablePageCount={setTablePageCount}
            setTablePageIndex={setTablePageIndex}
            tablePageIndex={tablePageIndex}
            setTableVisible={setTableVisible}
          />
          {!tableVisible &&
            <div id='table-placeholder-container'>
              <div id='table-placeholder'>
                Veriler yükleniyor. Lütfen Bekleyiniz...
              </div>
            </div>
          }
        </div>
        <div id='refresh-and-pagination'>
          <button
            id={refreshDisabled ? 'products-refresh-button-disabled' : 'products-refresh-button'}
            onClick={onRefreshClick}
            disabled={refreshDisabled}
          >
            <AiOutlineSync />
          </button>
          <Pagination table={tableState} setTablePageIndex={setTablePageIndex} tablePageIndex={tablePageIndex} tablePageCount={tablePageCount} />
        </div>
      </div>
      <div
        id='product-detail-toggle-button'
        onClick={handleShowDetailClick}
      >
        {
          showDetail.detailVisible ? <FaChevronRight /> : <FaChevronLeft />
        }
      </div>
      {showDetail.detailVisible &&
        <div id='product-detail-container'>
          {productData.code === "EmptyDataTable" ?
            <div id='product-detail-placeholder'>
              Görüntülemek için bir ürün seçiniz.
            </div>
            :
            Object.keys(productData).map((key, index) => (
              <div key={index} id='product-detail-text-container'>
                <div id='product-detail-title'>{key}</div>
                <div id='product-detail-value'>{productData[key] === '' ? '-----------' : productData[key]}</div>
              </div>
            ))
          }
        </div>
      }
    </div>
  );
};

export default Products;
