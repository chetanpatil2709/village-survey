import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from "react-router-dom";
import { axiosInstance } from '../../config/api';
import Table from "../../components/Table";
import { DropdownField } from '../../components/shared';
import { ToDecrypt } from '../../components/CryptoSecure';
import { useCookies } from 'react-cookie';
import getLabelString from '../../lang/getLabelString';

export default function Peoples() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [Cookies] = useCookies();
    const [data, setData] = useState([]);
    const [fetching, setfetching] = useState(false);
    const [villageList, setVillageList] = useState([]);
    const [serachInput, setSerachInput] = useState({
        village_id: ""
    });
    useEffect(() => {
        getVillages();
    }, []);
    useEffect(() => {
        if (searchParams.get('vid')) {
            getPeoples(searchParams.get('vid'));
            setSerachInput({ ...serachInput, village_id: searchParams.get('vid') })
        }
    }, [searchParams])
    const getVillages = async () => {
        const response = await axiosInstance.get("/village");
        if (response) {
            setVillageList(response.data[0]);
        }
    };
    const getPeoples = async (village_id) => {
        if (serachInput !== 0) {
            const response = await
                axiosInstance.get(`/people/by-villege/${village_id}`);
            if (response) {
                setData(response.data[0]);
                setfetching(false);
            }
        }
    };
    const deletePeople = (id) => {
        axiosInstance
            .delete("/people/" + id)
            .then((res) => {
                if (res.data.status === "success") {
                    alert("People Deleted Successfully");
                    if (searchParams.get('vid')) getPeoples(searchParams.get('vid'));
                    else window.location.reload()
                }
            })
            .catch((err) => {
                // console.log(err);
            });
    };
    const columns = React.useMemo(
        () => [
            {
                Header: "Sr. No",
                Cell: ({ row }) => row.index + 1
            },
            {
                Header: "Name",
                accessor: "p_name",
            },
            {
                Header: "Mobile",
                accessor: "mobile",
            },
            {
                Header: "Gender",
                accessor: "gender",
            },
            {
                Header: "Action",
                accessor: "action",
                Cell: ({ row }) => {
                    let villageName = villageList?.find(vl => vl.village_id === Number(searchParams.get('vid')));
                    return (<div className="d-flex btn-action justify-content-end">
                        <Link
                            className="view"
                            to={"/view?people=" + row.original.people_id}
                            // to={"/view?vid=" + searchParams.get('vid') + "&village=" + (villageName?.village_name || "") + "&people=" + row.original.people_id}
                            data-vname={villageName?.village_name}
                        >
                            <i className="bi bi-eye"></i>
                        </Link>
                        <Link
                            className="edit"
                            to={
                                "/people/add?pid=" + row.original.people_id
                            }
                        >
                            <i className="bi bi-pencil"></i>
                        </Link>
                        {
                            ToDecrypt(Cookies.UserType) === `"admin"` ? (
                                <button
                                    className="del"
                                    onClick={() => deletePeople(row.original.people_id)}
                                >
                                    <i className="bi bi-trash-fill"></i>
                                </button>
                            ) : (<></>)
                        }
                    </div>)
                },
            },
        ],
        [villageList, searchParams]
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
                                        <div className="col-md-4">
                                            <DropdownField
                                                name="village_id"
                                                value={serachInput.village_id}
                                                onChange={(e) => {
                                                    setSerachInput({ ...serachInput, village_id: e.target.value });
                                                    getPeoples(e.target.value);
                                                    searchParams.set('vid', e.target.value);
                                                    setSearchParams(searchParams.toString())
                                                }}
                                                err={""}
                                                options={villageList}
                                            />
                                        </div>
                                        <div className="col-md-4 d-grid align-items-center" style={{ "marginTop": "12px" }}>
                                            <Link to="/people/add" className="btn btn-primary mb-1" style={{ "width": "fit-content" }}>
                                                <span>{getLabelString("add_people")}</span>
                                            </Link>
                                        </div>
                                    </div>
                                    {
                                        !searchParams.get('vid') || searchParams.get('vid') === "0" ? (<>
                                            <div className='alert alert-info'>
                                                <div className='text-center'><strong>{getLabelString("select_village_for_data")}</strong></div>
                                            </div>
                                        </>) : <Table columns={columns} data={data} />
                                    }
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
