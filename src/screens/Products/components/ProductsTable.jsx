import React, { useEffect, useState, useRef } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel
} from '@tanstack/react-table';

import { FaExternalLinkAlt } from 'react-icons/fa';
import './ProductsTable.css'; // Import the CSS file
import { BiChevronDownCircle, BiChevronUpCircle, BiLinkExternal } from 'react-icons/bi';

const ProductsTable = ({ data, columns, sorting, setSorting, columnFilters, setColumnFilters, setProductCode, setTableState, setTablePageIndex, setTablePageCount, setTableVisible }) => {

  // Add the Detail column to the columns array
  const updatedColumns = React.useMemo(() => {
    return [
      ...columns,
      {
        accessorKey: 'detay',
        header: 'Detay',
        cell: ({ row }) => (
          <FaExternalLinkAlt
            onClick={() => setProductCode(row.original.StokKodu)}
            style={{ cursor: 'pointer', fontSize: 20 }}
          />
        ),
        // Additional metadata to help with styling
        meta: { sticky: true },
      },
    ];
  }, [columns]);

  const tableRef = useRef(null);

  const table = useReactTable({
    data,
    columns: updatedColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 8,
      },
      columnFilters: null
    },
    state: {
      sorting: sorting,
      columnFilters: columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters
  });

  useEffect(() => {
    setTableState(table);
  }, [data]);

  useEffect(() => {
    setTablePageIndex(table.getState().pagination.pageIndex);
    setTablePageCount(table.getPageCount());
  });

  const calculateFooter = () => {
    const sums = {};
    table.getRowModel().rows.forEach(row => {
      row.getVisibleCells().forEach(cell => {
        const isNumeric = cell.column.columnDef.isNumeric;
        const accessorKey = cell.column.columnDef.accessorKey;
        if (isNumeric) {
          sums[accessorKey] = (sums[accessorKey] || 0) + cell.getValue();
        }
      });
    });
    return sums;
  };

  const footerSums = calculateFooter();

  console.log("renderTable");

  return (
    <div className="table-container">
      <table className='w3-table-all my-table-style' ref={tableRef}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className={header.column.columnDef.accessorKey === 'detay' ? 'sticky-detail' : 'sticky-header'}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {
                    { asc: <BiChevronUpCircle style={{ marginLeft: 5, fontSize: 16 }} />, desc: <BiChevronDownCircle style={{ marginLeft: 5, fontSize: 16 }} /> }[
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
                <td
                  key={cell.id}
                  className={cell.column.columnDef.accessorKey === 'detay' ? 'sticky-detail' : ''}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            {table.getHeaderGroups()[0].headers.map(header => (
              <td key={header.id} className={header.column.columnDef.accessorKey === 'detay' ? 'sticky-detail' : ''}>
                {footerSums[header.column.columnDef.accessorKey] !== undefined
                  ? parseFloat(footerSums[header.column.columnDef.accessorKey]).toFixed(2)
                  : null}
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default React.memo(ProductsTable);
