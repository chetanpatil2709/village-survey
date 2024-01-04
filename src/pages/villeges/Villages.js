import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { axiosInstance } from '../../config/api';
import Table from "../../components/Table";
import getLabelString from '../../lang/getLabelString';
import PDFView from '../../pdf/PDFView';

export default function Villages() {
    const [data, setData] = useState([]);
    const [fetching, setfetching] = useState(true);
    useEffect(() => {
        getVillages();
    }, []);
    const getVillages = async () => {
        const response = await axiosInstance.get("/village");
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
                Header: "Village",
                accessor: "village_name",
            },
            {
                Header: "Post",
                accessor: "post",
            },
            {
                Header: "pincode",
                accessor: "pincode",
            },
            {
                Header: "Action",
                accessor: "action",
                Cell: ({ row }) => (
                    <div className="d-flex btn-action justify-content-end">
                        <Link
                            className="reload"
                            to={"/village-details?vid=" + row.original.village_id}
                            target="_blank" data-toggle="tooltip" data-placement="top"
                            title="download"
                        >
                            <i className="bi bi-download"></i>
                        </Link>
                        <Link
                            className="view"
                            to={"/view-village?vid=" + row.original.village_id}
                            data-toggle="tooltip" data-placement="top"
                            title="view"
                        >
                            <i className="bi bi-eye"></i>
                        </Link>
                        <Link
                            className="edit"
                            to={"/village/add?vid=" + row.original.village_id}
                            data-toggle="tooltip" data-placement="top"
                            title="edit"
                        >
                            <i className="bi bi-pencil"></i>
                        </Link>
                    </div >
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
                                    <div className="row mb-3">
                                        <div className="col-md-4 d-grid align-items-end" >
                                            <Link to="/village/add" className="btn btn-primary mb-1" style={{ "width": "fit-content" }}>
                                                <span>{getLabelString("add_new_village")}</span>
                                            </Link>
                                        </div>
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
            {/* <PDFView /> */}
        </>
    )
}
