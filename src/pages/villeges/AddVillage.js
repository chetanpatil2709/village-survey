import React, { useEffect, useState } from 'react';
import { InputField } from '../../components/shared';
import { axiosInstance } from '../../config/api';
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToDecrypt } from '../../components/CryptoSecure';
import { useCookies } from 'react-cookie';
import getLabelString from '../../lang/getLabelString';

export default function AddVillage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [Cookies] = useCookies();
    const villageSchema = {
        village_name: "",
        post: "",
        pincode: "",
        talathi_office: "",
        grampaanchayat: "",
        jp_circle: "",
        ps_circle: "",
        prathmik_aarogya_kendra: "",
        mseb_office: "",
        patsantha_shakha: [""],
        bank: [""],
        gas_agency: [""],
        school: [""],
        temple_statue_name: [""],
        village_major_problems_demands: [""],
        means_of_communication: [""],

        talathi_name: "",
        talathi_mobile: "",
        gramsevak_name: "",
        gramsevak_mobile: "",
        agri_assistant_name: "",
        agri_assistant_mobile: "",
        electrician_name: "",
        electrician_mobile: "",
        gp_emp_name: "",
        gp_emp_mobile: "",
        doctors_name: "",
        doctors_mobile: "",
        aasha_name: "",
        aasha_mobile: "",
        police_patil_name: "",
        police_patil_mobile: "",
        tantamukti_chif_name: "",
        tantamukti_chif_mobile: "",
        kotval_name: "",
        kotval_mobile: "",
        insurance_agent_name: "",
        insurance_agent_mobile: "",
        ration_shopkeeper_name: "",
        ration_shopkeeper_mobile: "",
        village_sketch: "",
        roads_connecting_village: "",
        created_by: ToDecrypt(Cookies.UserID)
    }
    const getLang = sessionStorage.getItem('lang');
    const [inputErr, setInputErr] = useState({ ...villageSchema });
    const [data, setData] = useState({ ...villageSchema });
    const [insertSuccess, setInsertSuccess] = useState(false);
    const handleChange = (e) => {
        let { value } = e.target;
        setData({ ...data, [e.target.name]: value });
    }
    const onKeypress = (evt) => {
        if (evt.which !== 8 && evt.which !== 0 && evt.which < 48 || evt.which > 57) {
            evt.preventDefault();
        }
    }
    const validateForm = () => {
        let tempErr = { ...villageSchema }
        let isValid = true;
        if (data.village_name === "") {
            tempErr.village_name = getLang === "en" ? "Please enter village name" : "कृपया गावाचे नाव प्रविष्ट करा";
            isValid = false;
        }
        if (data.post === "") {
            tempErr.post = getLang === "en" ? "Please enter post" : "कृपया पोस्ट प्रविष्ट करा";
            isValid = false;
        }
        if (data.pincode === "") {
            tempErr.pincode = getLang === "en" ? "Please enter pincode" : "कृपया पिनकोड प्रविष्ट करा";
            isValid = false;
        }

        if (data.pincode !== "" && data.pincode.toString().length !== 6) {
            tempErr.pincode = getLang === "en" ? "Please enter valid pincode" : "कृपया वैध पिनकोड प्रविष्ट करा";
            isValid = false;
        }
        if (data.talathi_office === "") {
            tempErr.talathi_office = getLang === "en" ? "Please enter talathi office" : "कृपया तलाठी कार्यालय प्रविष्ट करा";
            isValid = false;
        }
        if (data.jp_circle === "") {
            tempErr.jp_circle = getLang === "en" ? "Please enter j p circle" : "कृपया जि. प. सर्कल प्रविष्ट करा";
            isValid = false;
        }
        if (data.ps_circle === "") {
            tempErr.ps_circle = getLang === "en" ? "Please enter p s circle" : "कृपया पं. स. सर्कल प्रविष्ट करा";
            isValid = false;
        }
        if (data.mseb_office === "") {
            tempErr.mseb_office = getLang === "en" ? "Please enter mseb_office" : "कृपया MSEB कार्यालय प्रविष्ट करा";
            isValid = false;
        }
        if (data.talathi_mobile !== "" && data.talathi_mobile.length !== 10) {
            tempErr.talathi_mobile = getLang === "en" ? "Please enter valid mobile no" : "कृपया वैध मोबाईल प्रविष्ट करा";
            isValid = false;
        }
        if (data.gramsevak_mobile !== "" && data.gramsevak_mobile.length !== 10) {
            tempErr.gramsevak_mobile = getLang === "en" ? "Please enter valid mobile no" : "कृपया वैध मोबाईल प्रविष्ट करा";
            isValid = false;
        }
        if (data.agri_assistant_mobile !== "" && data.agri_assistant_mobile.length !== 10) {
            tempErr.agri_assistant_mobile = getLang === "en" ? "Please enter valid mobile no" : "कृपया वैध मोबाईल प्रविष्ट करा";
            isValid = false;
        }
        if (data.electrician_mobile !== "" && data.electrician_mobile.length !== 10) {
            tempErr.electrician_mobile = getLang === "en" ? "Please enter valid mobile no" : "कृपया वैध मोबाईल प्रविष्ट करा";
            isValid = false;
        }
        if (data.gp_emp_mobile !== "" && data.gp_emp_mobile.length !== 10) {
            tempErr.gp_emp_mobile = getLang === "en" ? "Please enter valid mobile no" : "कृपया वैध मोबाईल प्रविष्ट करा";
            isValid = false;
        }
        if (data.doctors_mobile !== "" && data.doctors_mobile.length !== 10) {
            tempErr.doctors_mobile = getLang === "en" ? "Please enter valid mobile no" : "कृपया वैध मोबाईल प्रविष्ट करा";
            isValid = false;
        }
        if (data.aasha_mobile !== "" && data.aasha_mobile.length !== 10) {
            tempErr.aasha_mobile = getLang === "en" ? "Please enter valid mobile no" : "कृपया वैध मोबाईल प्रविष्ट करा";
            isValid = false;
        }
        if (data.police_patil_mobile !== "" && data.police_patil_mobile.length !== 10) {
            tempErr.police_patil_mobile = getLang === "en" ? "Please enter valid mobile no" : "कृपया वैध मोबाईल प्रविष्ट करा";
            isValid = false;
        }
        if (data.tantamukti_chif_mobile !== "" && data.tantamukti_chif_mobile.length !== 10) {
            tempErr.tantamukti_chif_mobile = getLang === "en" ? "Please enter valid mobile no" : "कृपया वैध मोबाईल प्रविष्ट करा";
            isValid = false;
        }
        if (data.kotval_mobile !== "" && data.kotval_mobile.length !== 10) {
            tempErr.kotval_mobile = getLang === "en" ? "Please enter valid mobile no" : "कृपया वैध मोबाईल प्रविष्ट करा";
            isValid = false;
        }
        if (data.insurance_agent_mobile !== "" && data.insurance_agent_mobile.length !== 10) {
            tempErr.insurance_agent_mobile = getLang === "en" ? "Please enter valid mobile no" : "कृपया वैध मोबाईल प्रविष्ट करा";
            isValid = false;
        }
        if (data.ration_shopkeeper_mobile !== "" && data.ration_shopkeeper_mobile.length !== 10) {
            tempErr.ration_shopkeeper_mobile = getLang === "en" ? "Please enter valid mobile no" : "कृपया वैध मोबाईल प्रविष्ट करा";
            isValid = false;
        }

        if (data.patsantha_shakha.length > 0) {
            for (let item of data.patsantha_shakha) {
                if (item.includes(',')) {
                    tempErr.patsantha_shakha = "Please remove (,)."
                    isValid = false;
                }
            }
        }
        setInputErr(tempErr);
        return isValid;
    }
    const handleSubmit = () => {
        if (validateForm()) {
            const tempObj = { ...data };
            tempObj.temple_statue_name = data.temple_statue_name?.join(',')
            tempObj.school = data.school?.join(',')
            tempObj.bank = data.bank?.join(',')
            tempObj.patsantha_shakha = data.patsantha_shakha?.join(',')
            tempObj.gas_agency = data.gas_agency?.join(',')
            tempObj.village_major_problems_demands = data.village_major_problems_demands?.join(',')
            tempObj.means_of_communication = data.means_of_communication?.join(',')
            axiosInstance.post(`/village/`, tempObj)
                .then(res => {
                    setInsertSuccess(true);
                    setTimeout(() => {
                        setInsertSuccess(false);
                        handleReset()
                    }, 2000);
                })
            // .catch(err => console.log(err))
        }
    }
    const handleUpdate = () => {
        if (validateForm()) {
            const tempObj = { ...data };
            tempObj.temple_statue_name = data.temple_statue_name?.join(',')
            tempObj.school = data.school?.join(',')
            tempObj.bank = data.bank?.join(',')
            tempObj.patsantha_shakha = data.patsantha_shakha?.join(',')
            tempObj.gas_agency = data.gas_agency?.join(',')
            tempObj.village_major_problems_demands = data.village_major_problems_demands?.join(',')
            tempObj.means_of_communication = data.means_of_communication?.join(',')
            axiosInstance.put(`/village/${searchParams.get('vid')}`, tempObj)
                .then(res => {
                    setInsertSuccess(true);
                    setTimeout(() => {
                        setInsertSuccess(false);
                    }, 2000);
                    if (searchParams.get('vid')) {
                        setTimeout(() => (navigate(`/villages`)), 2000);
                    }
                })
        }
    }
    const getVillage = () => {
        if (searchParams.get('vid')) {
            axiosInstance.get(`/village/${searchParams.get('vid')}`)
                .then(res => {
                    let tempObj = res.data[0][0];
                    tempObj.temple_statue_name = tempObj.temple_statue_name?.split(',')
                    tempObj.school = tempObj.school?.split(',')
                    tempObj.bank = tempObj.bank?.split(',')
                    tempObj.patsantha_shakha = tempObj.patsantha_shakha?.split(',')
                    tempObj.gas_agency = tempObj.gas_agency?.split(',')
                    tempObj.village_major_problems_demands = tempObj.village_major_problems_demands?.split(',')
                    tempObj.means_of_communication = tempObj.means_of_communication?.split(',')
                    setData(tempObj);
                })
            // .catch(err => console.log(err))
        }
    }
    useEffect(() => {
        getVillage();
    }, [])
    const handleReset = () => {
        setData({ ...villageSchema });
        setInputErr({ ...villageSchema });
    };
    const handleDynamicInputChange = (e) => {
        let tempArr = [...data[e.target.name]];
        tempArr[e.target.id] = e.target.value.replace(/^,|,$/g, "");
        setData({ ...data, [e.target.name]: tempArr });
    }

    const handleAddInArray = (key) => {
        let tempArr = [...data[key]];
        tempArr.push("");
        setData({ ...data, [key]: tempArr })
    }
    const handleVillageSketch = (e) => {
        console.log(e.target.files[0])
        const formData = new FormData();
        const file = e.target.files[0];
        let village_sketch_path;
        let v_name = data.village_name.split(' ').join('-');
        village_sketch_path = v_name + "_sketch_" + Date.now() + "." + file.name.split('.').pop();
        setData({ ...data, village_sketch: village_sketch_path })
        formData.append('sketchFile', file, village_sketch_path);
        console.log("formData", formData)
        axiosInstance.post('village/sketch/', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then((res) => {
            // console.log(res)
        })
    }
    const handleRoadsCnnectingVillage = (e) => {
        const formData = new FormData();
        const file = e.target.files[0];
        let roads_connecting_village_path;
        let v_name = data.village_name.split(' ').join('-');
        roads_connecting_village_path = v_name + "_roadconnection_" + Date.now() + "." + file.name.split('.').pop();
        setData({ ...data, roads_connecting_village: roads_connecting_village_path })
        formData.append('sketchFile', file, roads_connecting_village_path);
        axiosInstance.post('village/sketch/', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then((res) => {
            // console.log(res)
        })
    }
    const handleBack = () => {
        navigate(-1)
    }
    return (
        <div>
            <div className="pt-3">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-12 col-md-11">
                        <div className="card">
                            <div className="card-body">
                                <div className="p-2">
                                    <div className='d-flex justify-content-between'>
                                        <h4 className='mb-3'>{getLabelString('add_new_village')}</h4>
                                        <button className='btn btn-primary' onClick={handleBack}>{getLabelString('back_page')}</button>
                                    </div>
                                    <div className="row mb-2 ">
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("village_name")}
                                                type="text"
                                                name="village_name"
                                                value={data.village_name}
                                                onChange={handleChange}
                                                err={inputErr.village_name}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("post")}
                                                type="text"
                                                name="post"
                                                value={data.post}
                                                onChange={handleChange}
                                                err={inputErr.post} />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("pincode")} type="number"
                                                name="pincode"
                                                value={data.pincode}
                                                onChange={handleChange}
                                                err={inputErr.pincode}
                                                onKeyPress={onKeypress} />
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("talathi_office")}
                                                type="text" name="talathi_office"
                                                value={data.talathi_office}
                                                onChange={handleChange}
                                                err={inputErr.talathi_office} />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("grampaanchayat")} type="text"
                                                name="grampaanchayat"
                                                value={data.grampaanchayat}
                                                onChange={handleChange}
                                                err={inputErr.grampaanchayat} />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("jp_circle")} type="text" name="jp_circle"
                                                value={data.jp_circle}
                                                onChange={handleChange}
                                                err={inputErr.jp_circle} />
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("ps_circle")}
                                                type="text" name="ps_circle"
                                                value={data.ps_circle}
                                                onChange={handleChange}
                                                err={inputErr.ps_circle} />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("prathmik_aarogya_kendra")} type="text" name="prathmik_aarogya_kendra"
                                                value={data.prathmik_aarogya_kendra}
                                                onChange={handleChange}
                                                err={inputErr.prathmik_aarogya_kendra} />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("mseb_office")}
                                                type="text" name="mseb_office"
                                                value={data.mseb_office}
                                                onChange={handleChange}
                                                err={inputErr.mseb_office} />
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-label">{getLabelString("patsantha_shakha")}</label>
                                                {data.patsantha_shakha ? (
                                                    data.patsantha_shakha.map((item, idx) => (
                                                        <div className="mb-3" key={idx}>
                                                            <input
                                                                type="text"
                                                                className={"form-control " + (typeof inputErr.patsantha_shakha !== 'object' && inputErr.patsantha_shakha !== "" ? " invalid" : "")}
                                                                value={item}
                                                                onChange={handleDynamicInputChange}
                                                                name="patsantha_shakha"
                                                                id={idx}
                                                            />

                                                        </div>
                                                    ))
                                                ) : (
                                                    <></>
                                                )}
                                                {
                                                    inputErr.patsantha_shakha && (
                                                        <span><small className='text-danger'>{inputErr.patsantha_shakha}</small></span>
                                                    )
                                                }
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <button
                                                    className="btn btn-primary add_more_btn"
                                                    tabIndex={-1}
                                                    onClick={() => handleAddInArray('patsantha_shakha')}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        className="bi bi-plus"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                    </svg>
                                                    <small>{getLabelString("add_more")}</small>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-label">{getLabelString("gas_agency")}</label>
                                                {data.gas_agency ? (
                                                    data.gas_agency.map((item, idx) => (
                                                        <div className="mb-3" key={idx}>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={item}
                                                                onChange={handleDynamicInputChange}
                                                                name="gas_agency"
                                                                id={idx}
                                                                autoComplete="off"
                                                            />
                                                        </div>
                                                    ))
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <button
                                                    className="btn btn-primary add_more_btn"
                                                    tabIndex={-1}
                                                    onClick={() => handleAddInArray('gas_agency')}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        className="bi bi-plus"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                    </svg>
                                                    <small>{getLabelString("add_more")}</small>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-label">{getLabelString("school")}</label>
                                                {data.school ? (
                                                    data.school.map((item, idx) => (
                                                        <div className="mb-3" key={idx}>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={item}
                                                                onChange={handleDynamicInputChange}
                                                                name="school"
                                                                id={idx}
                                                                autoComplete="off"
                                                            />
                                                        </div>
                                                    ))
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <button
                                                    className="btn btn-primary add_more_btn"
                                                    tabIndex={-1}
                                                    onClick={() => handleAddInArray('school')}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        className="bi bi-plus"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                    </svg>
                                                    <small>{getLabelString("add_more")}</small>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-label">
                                                    {getLabelString("village_major_problems_demands")}
                                                </label>
                                                {data.village_major_problems_demands ? (
                                                    data.village_major_problems_demands.map((item, idx) => (
                                                        <div className="mb-3" key={idx}>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={item}
                                                                onChange={handleDynamicInputChange}
                                                                name="village_major_problems_demands"
                                                                id={idx}
                                                                err={inputErr.village_major_problems_demands}
                                                                autoComplete="off"
                                                            />
                                                            {
                                                                inputErr.village_major_problems_demands && (
                                                                    <span><small className='text-danger'>{inputErr.village_major_problems_demands}</small></span>
                                                                )
                                                            }
                                                        </div>
                                                    ))
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <button
                                                    className="btn btn-primary add_more_btn"
                                                    tabIndex={-1}
                                                    onClick={() => handleAddInArray('village_major_problems_demands')}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        className="bi bi-plus"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                    </svg>
                                                    <small>{getLabelString("add_more")}</small>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-label">{getLabelString("means_of_communication")}</label>
                                                {data.means_of_communication ? (
                                                    data.means_of_communication.map((item, idx) => (
                                                        <div className="mb-3" key={idx}>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={item}
                                                                onChange={handleDynamicInputChange}
                                                                name="means_of_communication"
                                                                id={idx}
                                                                err={inputErr.means_of_communication}
                                                                autoComplete="off"
                                                            />
                                                            {
                                                                inputErr.means_of_communication && (
                                                                    <span><small className='text-danger'>{inputErr.means_of_communication}</small></span>
                                                                )
                                                            }
                                                        </div>
                                                    ))
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <button
                                                    className="btn btn-primary add_more_btn"
                                                    tabIndex={-1}
                                                    onClick={() => handleAddInArray('means_of_communication')}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        className="bi bi-plus"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                    </svg>
                                                    <small>{getLabelString("add_more")}</small>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-label">{getLabelString("temple_statue_name")}</label>
                                                {data.temple_statue_name ? (
                                                    data.temple_statue_name.map((item, idx) => (
                                                        <div className="mb-3" key={idx}>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={item}
                                                                onChange={handleDynamicInputChange}
                                                                name="temple_statue_name"
                                                                id={idx}
                                                                autoComplete="off"
                                                            />
                                                        </div>
                                                    ))
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <button
                                                    className="btn btn-primary add_more_btn"
                                                    tabIndex={-1}
                                                    onClick={() => handleAddInArray('temple_statue_name')}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        className="bi bi-plus"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                    </svg>
                                                    <small>{getLabelString("add_more")}</small>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-label">{getLabelString("bank")}</label>
                                                {data.bank ? (
                                                    data.bank.map((item, idx) => (
                                                        <div className="mb-3" key={idx}>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={item}
                                                                onChange={handleDynamicInputChange}
                                                                name="bank"
                                                                id={idx}
                                                                autoComplete="off"
                                                            />
                                                        </div>
                                                    ))
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <button
                                                    className="btn btn-primary add_more_btn"
                                                    tabIndex={-1}
                                                    onClick={() => handleAddInArray('bank')}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        className="bi bi-plus"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                    </svg>
                                                    <small>{getLabelString("add_more")}</small>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("talathi_name")}
                                                type="text"
                                                name="talathi_name"
                                                value={data.talathi_name}
                                                onChange={handleChange}
                                                err={inputErr.talathi_name}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("talathi_mobile")}
                                                type="number"
                                                name="talathi_mobile"
                                                value={data.talathi_mobile}
                                                onChange={handleChange}
                                                err={inputErr.talathi_mobile} />
                                        </div>
                                    </div>
                                    <div className="row mb-2 ">
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("gramsevak_name")}
                                                type="text"
                                                name="gramsevak_name"
                                                value={data.gramsevak_name}
                                                onChange={handleChange}
                                                err={inputErr.gramsevak_name}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("gramsevak_mobile")}
                                                type="number"
                                                name="gramsevak_mobile"
                                                value={data.gramsevak_mobile}
                                                onChange={handleChange}
                                                err={inputErr.gramsevak_mobile} />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("agri_assistant_name")}
                                                type="text" name="agri_assistant_name"
                                                value={data.agri_assistant_name}
                                                onChange={handleChange}
                                                err={inputErr.agri_assistant_name} />
                                        </div>
                                    </div>
                                    <div className="row mb-2 ">
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("agri_assistant_mobile")}
                                                type="number"
                                                name="agri_assistant_mobile"
                                                value={data.agri_assistant_mobile}
                                                onChange={handleChange}
                                                err={inputErr.agri_assistant_mobile}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("electrician_name")}
                                                type="text"
                                                name="electrician_name"
                                                value={data.electrician_name}
                                                onChange={handleChange}
                                                err={inputErr.electrician_name} />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("electrician_mobile")}
                                                type="number" name="electrician_mobile"
                                                value={data.electrician_mobile}
                                                onChange={handleChange}
                                                err={inputErr.electrician_mobile} />
                                        </div>
                                    </div>
                                    <div className="row mb-2 ">
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("gp_emp_name")}
                                                type="text"
                                                name="gp_emp_name"
                                                value={data.gp_emp_name}
                                                onChange={handleChange}
                                                err={inputErr.gp_emp_name}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("gp_emp_mobile")}
                                                type="number"
                                                name="gp_emp_mobile"
                                                value={data.gp_emp_mobile}
                                                onChange={handleChange}
                                                err={inputErr.gp_emp_mobile} />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("doctors_name")}
                                                type="text" name="doctors_name"
                                                value={data.doctors_name}
                                                onChange={handleChange}
                                                err={inputErr.doctors_name} />
                                        </div>
                                    </div>
                                    <div className="row mb-2 ">
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("doctors_mobile")}
                                                type="number"
                                                name="doctors_mobile"
                                                value={data.doctors_mobile}
                                                onChange={handleChange}
                                                err={inputErr.doctors_mobile}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("aasha_name")}
                                                type="text"
                                                name="aasha_name"
                                                value={data.aasha_name}
                                                onChange={handleChange}
                                                err={inputErr.aasha_name} />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("aasha_mobile")}
                                                type="number" name="aasha_mobile"
                                                value={data.aasha_mobile}
                                                onChange={handleChange}
                                                err={inputErr.aasha_mobile} />
                                        </div>
                                    </div>
                                    <div className="row mb-2 ">
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("police_patil_name")}
                                                type="text"
                                                name="police_patil_name"
                                                value={data.police_patil_name}
                                                onChange={handleChange}
                                                err={inputErr.police_patil_name}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("police_patil_mobile")}
                                                type="number"
                                                name="police_patil_mobile"
                                                value={data.police_patil_mobile}
                                                onChange={handleChange}
                                                err={inputErr.police_patil_mobile} />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("tantamukti_chif_name")}
                                                type="text" name="tantamukti_chif_name"
                                                value={data.tantamukti_chif_name}
                                                onChange={handleChange}
                                                err={inputErr.tantamukti_chif_name} />
                                        </div>
                                    </div>
                                    <div className="row mb-2 ">
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("tantamukti_chif_mobile")}
                                                type="number"
                                                name="tantamukti_chif_mobile"
                                                value={data.tantamukti_chif_mobile}
                                                onChange={handleChange}
                                                err={inputErr.tantamukti_chif_mobile}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("kotval_name")}
                                                type="text"
                                                name="kotval_name"
                                                value={data.kotval_name}
                                                onChange={handleChange}
                                                err={inputErr.kotval_name} />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("kotval_mobile")}
                                                type="number" name="kotval_mobile"
                                                value={data.kotval_mobile}
                                                onChange={handleChange}
                                                err={inputErr.kotval_mobile} />
                                        </div>
                                    </div>
                                    <div className="row mb-2 ">
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("insurance_agent_name")}
                                                type="text"
                                                name="insurance_agent_name"
                                                value={data.insurance_agent_name}
                                                onChange={handleChange}
                                                err={inputErr.insurance_agent_name}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("insurance_agent_mobile")}
                                                type="number"
                                                name="insurance_agent_mobile"
                                                value={data.insurance_agent_mobile}
                                                onChange={handleChange}
                                                err={inputErr.insurance_agent_mobile} />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("ration_shopkeeper_name")}
                                                type="text" name="ration_shopkeeper_name"
                                                value={data.ration_shopkeeper_name}
                                                onChange={handleChange}
                                                err={inputErr.ration_shopkeeper_name} />
                                        </div>
                                    </div>
                                    <div className="row mb-2 ">
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("ration_shopkeeper_mobile")}
                                                type="number"
                                                name="ration_shopkeeper_mobile"
                                                value={data.ration_shopkeeper_mobile}
                                                onChange={handleChange}
                                                err={inputErr.ration_shopkeeper_mobile}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("village_sketch")}
                                                type="file"
                                                name="village_sketch"
                                                //value={data.village_sketch}
                                                isDisabled={data.village_name ? false : true}
                                                onChange={(e) => {
                                                    handleVillageSketch(e)
                                                }}
                                                err={inputErr.village_sketch}
                                            />
                                            {
                                                data.village_sketch !== "" ?
                                                    <span className='text-success'>{data.village_sketch}</span> : <></>
                                            }
                                        </div>
                                        <div className="col-md-4">
                                            <InputField label={getLabelString("roads_connecting_village")}
                                                type="file"
                                                name="roads_connecting_village"
                                                // value={data.roads_connecting_village}
                                                isDisabled={data.village_name ? false : true}
                                                onChange={(e) => {
                                                    handleRoadsCnnectingVillage(e)
                                                }}
                                                err={inputErr.roads_connecting_village}
                                            />
                                            {
                                                data.roads_connecting_village !== "" ?
                                                    <span className='text-success'>{data.roads_connecting_village}</span> : <></>
                                            }
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center pt-3">
                                        <button
                                            className="btn btn-secondary me-3"
                                            onClick={handleReset}
                                        >
                                            {getLabelString("reset")}
                                        </button>
                                        <button
                                            className="btn btn-primary d-flex align-items-center"
                                            onClick={searchParams.get('vid') ? handleUpdate : handleSubmit}
                                        >
                                            {
                                                searchParams.get('vid') ? getLabelString("update") : getLabelString("submit")
                                            }
                                        </button>
                                    </div>
                                    <div className='d-flex justify-content-center pb-0 mt-3'>
                                        {
                                            insertSuccess && (
                                                <div className='alert alert-success'>
                                                    {getLabelString('village_inserted')}
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
