import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
import { axiosInstance } from '../../config/api';
import getLabelString from '../../lang/getLabelString';

export default function View() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [fetching, setfetching] = useState(false);
    useEffect(() => {
        if (searchParams.get('people')) {
            getPeoples(searchParams.get('people'));
        }
    }, [searchParams])
    const getPeoples = async (id) => {
        const response = await
            axiosInstance.get(`/people/by-id-village/${id}`);
        if (response) {
            setData(response.data[0]);
            setfetching(false);
        }
    };
    const handleBack = () => {
        navigate(-1)
    }
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
                                    <div className="p-2">
                                        <div className='d-flex justify-content-between mb-3'>
                                            <h4>{getLabelString(searchParams.get('people') ? 'people' : 'village')}</h4>
                                            <button className='btn btn-primary' onClick={handleBack}>{getLabelString('back_page')}</button>
                                        </div>
                                        <div className="row mb-3">
                                            <table className='table table-bordered'>
                                                {
                                                    data.map((i, index) => (
                                                        <tbody key={index} className="view_table">
                                                            <tr>
                                                                <th>{getLabelString('village_name')}</th>
                                                                <td>{i.village_name}</td>
                                                                {/* <td>{searchParams.get('village')}</td> */}
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('name')}</th>
                                                                <td>{i.p_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('mobile')}</th>
                                                                <td>{i.mobile}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('gender')}</th>
                                                                <td>{i.gender}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('nimshashkiy_emp')}</th>
                                                                <td>{i.nimshashkiy_emp === 1 ? 'Yes' : 'No'}</td>
                                                            </tr>
                                                            {
                                                                i.nimshashkiy_emp === 1 ? (<tr>
                                                                    <th>{getLabelString('nimshashkiy_position')}</th>
                                                                    <td>{i.nimshashkiy_position}</td>
                                                                </tr>) : <></>
                                                            }
                                                            <tr>
                                                                <th>{getLabelString('political_party_activists')}</th>
                                                                <td>{i.political_party_activists === 1 ? 'Yes' : 'No'}</td>
                                                            </tr>
                                                            {
                                                                i.political_party_activists === 1 ? (<tr>
                                                                    <th>{getLabelString('political_party_activists_party')}</th>
                                                                    <td>{i.political_party_activists_party}</td>
                                                                </tr>) : <></>
                                                            }
                                                            <tr>
                                                                <th>{getLabelString('societies_activists_high_edu')}</th>
                                                                <td>{i.societies_activists_high_edu === 1 ? 'Yes' : 'No'}</td>
                                                            </tr>
                                                            {
                                                                i.societies_activists_high_edu === 1 ? (<tr>
                                                                    <th>{getLabelString('societies_activists_high_edu_education')}</th>
                                                                    <td>{i.societies_activists_high_edu_education}</td>
                                                                </tr>) : <></>
                                                            }
                                                            <tr>
                                                                <th>{getLabelString('school_stu')}</th>
                                                                <td>{i.school_stu === 1 ? 'Yes' : 'No'}</td>
                                                            </tr>

                                                            <tr>
                                                                <th>{getLabelString('gp_member_sarpanch')}</th>
                                                                <td>{i.gp_member_sarpanch === 1 ? 'Yes' : 'No'}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('former_army_or_family')}</th>
                                                                <td>{i.former_army_or_family === 1 ? 'Yes' : 'No'}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('shopkeeper_marchant')}</th>
                                                                <td>{i.shopkeeper_marchant === 1 ? 'Yes' : 'No'}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('progressive_farmer')}</th>
                                                                <td>{i.progressive_farmer === 1 ? 'Yes' : 'No'}</td>
                                                            </tr>
                                                        </tbody>
                                                    ))
                                                }

                                            </table>
                                        </div>
                                    </div>
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
