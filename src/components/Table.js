import React from 'react';
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  usePagination,
} from "react-table";
import { PageButton } from "../components/Button";
import { SortIcon, SortUpIcon, SortDownIcon, Chevron } from "../components/Icons";

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <label className="flex">
      <input
        type="text"
        className="form-control"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Search Here...`}
        style={{ minWidth: 200 }}
      />
    </label>
  );
}

export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id, render },
}) {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <label className="flex gap-x-2 items-baseline">
      <span className="text-gray-700">{render("Header")}: </span>
      <select
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        name={id}
        id={id}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-row-reverse">
        {headerGroups.map((headerGroup) =>
          headerGroup.headers.map((column) =>
            column.Filter ? (
              <div className="mt-2 sm:mt-0" key={column.id}>
                {column.render("Filter")}
              </div>
            ) : null
          )
        )}
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <div className='overflow-auto'>
        <table
          {...getTableProps()}
          className="table table-hover table-bordereds table-striped"
        >
          <thead className="bg-gray-50">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    scope="col"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    <div className="d-flex items-center justify-between">
                      {column.render("Header")}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <SortDownIcon className="w-4 h-4 text-gray-400" />
                          ) : (
                            <SortUpIcon className="w-4 h-4 text-gray-400" />
                          )
                        ) : (
                          <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                        )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps()}
            className="bg-white divide-y divide-gray-200"
          >
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} role="cell">
                        {cell.column.Cell.name === "defaultRenderer" ? (
                          <div className="text-sm text-gray-500">
                            {cell.render("Cell")}
                          </div>
                        ) : (
                          cell.render("Cell")
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="py-2">
        <div className="d-flex flex-wrap flex-md-wrap align-items-center justify-content-between">
          <div className="d-flex align-items-center mb-3 mb-md-0">
            <span className="text-sm text-gray-700">
              Page <span className="font-medium">{state.pageIndex + 1}</span> of{" "}
              <span className="font-medium">{pageOptions.length}</span>
            </span>
            <label className="d-flex align-items-center ms-3">
              {/* <span className="text-nowrap">Items Per Page</span> */}
              <select
                className="form-select ms-2"
                value={state.pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[5, 10, 20].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <ul className="pagination mb-0" aria-label="Pagination">
            <PageButton
              onClick={(e) => {
                e.preventDefault();
                gotoPage(0);
              }}
              disabled={!canPreviousPage}
              className={!canPreviousPage ? "disabled" : ""}
            >
              <Chevron
                type="DoubleLeft"
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              {/* <span className="sr-only">First</span> */}
            </PageButton>
            <PageButton
              onClick={(e) => {
                e.preventDefault();
                previousPage();
              }}
              disabled={!canPreviousPage}
              className={!canPreviousPage ? "disabled" : ""}
            >
              <Chevron
                type="Left"
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              {/* <span className="sr-only">Previous</span> */}
            </PageButton>
            <PageButton
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className={!canNextPage ? "disabled" : ""}
            >
              {/* <span className="sr-only">Next</span> */}
              <Chevron
                type="Right"
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </PageButton>
            <PageButton
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className={!canNextPage ? "disabled" : ""}
            >
              {/* <span className="sr-only">Last</span> */}
              <Chevron
                type="DoubleRight"
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </PageButton>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Table;
