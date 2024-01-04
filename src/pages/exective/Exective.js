import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { axiosInstance } from '../../config/api';
import Table from "../../components/Table";
import getLabelString from '../../lang/getLabelString';
export default function Exective() {
    const [data, setData] = useState([]);
    const [fetching, setfetching] = useState(true);
    useEffect(() => {
        getDetails();
    }, []);
    const getDetails = async () => {
        const response = await axiosInstance.get("/user/all");
        if (response) {
            setData(response.data[0]);
            setfetching(false);
        }
    };
    const columns = React.useMemo(
        () => [
            {
                Header: "Sr. No",
                Cell: ({ row }) => row.index + 1
            },
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Mobile",
                accessor: "mobile",
            },
            {
                Header: "Role",
                accessor: "role",
            },
            {
                Header: "Status",
                accessor: "isActive",
                Cell: ({ row }) => <span className={'badge bg-' + (row.original.isActive === 1 ? "success" : "danger")}>
                    {
                        row.original.isActive === 1 ? "Active" : "Disabled"
                    }
                </span>
            },
            {
                Header: "Action",
                accessor: "action",
                Cell: ({ row }) => (
                    <div className="d-flex btn-action justify-content-end">
                        <Link
                            className="edit"
                            to={
                                `/exective/add?uid=` +
                                row.original.user_id
                            }
                        >
                            <i className="bi bi-pencil"></i>
                        </Link>
                        {/* <button
                            className="del"
                            onClick={() => changeUserStatus(row.original.TourID)}
                        >
                            <i className="bi bi-trash-fill"></i>
                        </button> */}
                        {/* <button
                            className="del"
                            onClick={() => deleteQuotation(row.original.TourID)}
                        >
                            <i className="bi bi-trash-fill"></i>
                        </button> */}
                    </div>
                ),
            },
        ],
        []
    );
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-12">
                            {fetching ? (
                                <div className="text-center p-4">Fetching Data...</div>
                            ) : data !== null && data !== undefined ? (
                                <>
                                    <div>
                                        <Link to="/exective/add" className="btn btn-primary mb-1 d-flex align-items-center" style={{ "width": "fit-content" }}>
                                            <span>{getLabelString("add_exective")}</span>
                                        </Link>
                                    </div>
                                    <Table columns={columns} data={data} />
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
