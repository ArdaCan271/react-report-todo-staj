import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  getSortedRowModel
} from '@tanstack/react-table';

import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineSearch } from 'react-icons/ai';

const Table = ({ data, columns, filtering, setFiltering, sorting, setSorting, columnFilters, setColumnFilters, columnFilterSetters }) => {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
      columnFilters: columnFilters
    },
    onGlobalFilterChange: setFiltering,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters
  });

  console.log("renderTable");

  return (
    <>
      <thead>
        {/* <tr>
          <th className='th-column-filter'>
            <div className='column-filter-container'>
              <input
                className='column-filter-input'
                placeholder='...'
              />
              <div className='column-filter-button'>
                <AiOutlineSearch/>
              </div>
            </div>
          </th>
          {columnFilters.map(({id, value}) => (
            <th key={id} className='th-column-filter'>
              {console.log(id)}
              <div className='column-filter-container'>
                <input
                  className='column-filter-input'
                  value={value}
                  placeholder='...'
                />
                <div className='column-filter-button'>
                  <AiOutlineSearch />
                </div>
              </div>
            </th>
          ))}
        </tr> */}
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                {flexRender(header.column.columnDef.header, header.getContext())}
                {
                  { asc: <AiOutlineArrowUp/>, desc: <AiOutlineArrowDown/> }[
                    header.column.getIsSorted() ?? null
                  ]
                }
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </>
  );
}

export default React.memo(Table);