import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
import { axiosInstance } from '../../config/api';
import getLabelString from '../../lang/getLabelString';

export default function ViewVillage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [fetching, setfetching] = useState(false);
    useEffect(() => {
        if (searchParams.get('vid')) {
            getVillage(searchParams.get('vid'));
        }
    }, [searchParams])
    const getVillage = async (id) => {
        const response = await
            axiosInstance.get(`/village/${id}`);
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
                                                        <tbody key={index}>
                                                            <tr>
                                                                <th>{getLabelString('village_name')}</th>
                                                                <td>{i.village_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('post')}</th>
                                                                <td>{i.post}</td>
                                                            </tr>
                                                            <tr >
                                                                <th>{getLabelString('pincode')}</th>
                                                                <td>{i.pincode}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('talathi_office')}</th>
                                                                <td>{i.talathi_office}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('grampaanchayat')}</th>
                                                                <td>{i.grampaanchayat}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('jp_circle')}</th>
                                                                <td>{i.jp_circle}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('ps_circle')}</th>
                                                                <td>{i.ps_circle}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('prathmik_aarogya_kendra')}</th>
                                                                <td>{i.prathmik_aarogya_kendra}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('mseb_office')}</th>
                                                                <td>{i.mseb_office}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('patsantha_shakha')}</th>
                                                                <td>{i.patsantha_shakha}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('bank')}</th>
                                                                <td>{i.bank}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('gas_agency')}</th>
                                                                <td>{i.gas_agency}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('school')}</th>
                                                                <td>{i.school}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('temple_statue_name')}</th>
                                                                <td>{i.temple_statue_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('village_major_problems_demands')}</th>
                                                                <td>{i.village_major_problems_demands}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('means_of_communication')}</th>
                                                                <td>{i.means_of_communication}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('talathi_name')}</th>
                                                                <td>{i.talathi_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('talathi_mobile')}</th>
                                                                <td>{i.talathi_mobile}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('gramsevak_name')}</th>
                                                                <td>{i.gramsevak_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('gramsevak_mobile')}</th>
                                                                <td>{i.gramsevak_mobile}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('agri_assistant_name')}</th>
                                                                <td>{i.agri_assistant_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('agri_assistant_mobile')}</th>
                                                                <td>{i.agri_assistant_mobile}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('electrician_name')}</th>
                                                                <td>{i.electrician_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('electrician_mobile')}</th>
                                                                <td>{i.electrician_mobile}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('gp_emp_name')}</th>
                                                                <td>{i.gp_emp_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('gp_emp_mobile')}</th>
                                                                <td>{i.gp_emp_mobile}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('doctors_name')}</th>
                                                                <td>{i.doctors_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('doctors_mobile')}</th>
                                                                <td>{i.doctors_mobile}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('aasha_name')}</th>
                                                                <td>{i.aasha_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('aasha_mobile')}</th>
                                                                <td>{i.aasha_mobile}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('police_patil_name')}</th>
                                                                <td>{i.police_patil_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('police_patil_mobile')}</th>
                                                                <td>{i.police_patil_mobile}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('tantamukti_chif_name')}</th>
                                                                <td>{i.tantamukti_chif_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('tantamukti_chif_mobile')}</th>
                                                                <td>{i.tantamukti_chif_mobile}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('kotval_name')}</th>
                                                                <td>{i.kotval_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('kotval_mobile')}</th>
                                                                <td>{i.kotval_mobile}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('insurance_agent_name')}</th>
                                                                <td>{i.insurance_agent_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('insurance_agent_mobile')}</th>
                                                                <td>{i.insurance_agent_mobile}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('ration_shopkeeper_name')}</th>
                                                                <td>{i.ration_shopkeeper_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('ration_shopkeeper_mobile')}</th>
                                                                <td>{i.ration_shopkeeper_mobile}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('village_sketch')}</th>
                                                                <td>
                                                                    {
                                                                        i.village_sketch ?
                                                                            <a
                                                                                href={"http://localhost:5000/village/image/" + i.village_sketch}
                                                                                className="text-primary"
                                                                                target="view_village_image"
                                                                            >view image
                                                                            </a> : <span>image not avilabole</span>
                                                                    }
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>{getLabelString('roads_connecting_village')}</th>
                                                                <td>
                                                                    {i.roads_connecting_village ?
                                                                        <a
                                                                            href={"http://localhost:5000/village/image/" + i.roads_connecting_village}
                                                                            className="text-primary" target="view_village_image">view image
                                                                        </a> : <span>image not avilable</span>
                                                                    }
                                                                </td>
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
