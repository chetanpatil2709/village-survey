import React from "react";
import getLabelString from "../lang/getLabelString";
import { classNames } from "./Utils";

export function Button({ children, className, ...rest }) {
  return (
    <button
      type="button"
      className={classNames(
        "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function PageButton({ children, className, ...rest }) {
  return (
    <li className={classNames("page-item", className)}>
      <button type="button" className="page-link" {...rest}>
        {children}
      </button>
    </li>
  );
}

export function PdfDownload({ onClick }) {
  return (
    <div className="row d-flex justify-content-end py-3">
      <button className='btn btn-primary w-auto h-auto'
        onClick={onClick}
      >
        {getLabelString('download_pdf')}
      </button>
    </div>
  );
}
