import React, { useEffect, useState } from 'react';
import { InputField, RadioInput } from '../../components/shared';
import { axiosInstance } from '../../config/api';
import { useNavigate, useSearchParams } from "react-router-dom";
import { validateMobile, validatePassword } from '../../components/const';
import getLabelString from '../../lang/getLabelString';

export default function AddExective() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [insertSuccess, setInsertSuccess] = useState("");
    const [serverErr, setServerErr] = useState("");
    const getLang = sessionStorage.getItem('lang');
    const exectiveSchema = {
        name: "",
        mobile: "",
        role: "",
        isActive: true,
        password: "",
        confirm_password: "",
        passType: "password"
    }
    const [data, setData] = useState({ ...exectiveSchema });
    const [inputErr, setInputErr] = useState({ ...exectiveSchema });
    const validateForm = () => {
        let tempErr = { ...exectiveSchema }
        let isValid = true;
        if (data.village_id === 0) {
            tempErr.village_id = getLang === "en" ? "Select village" : "गाव निवडा";
            isValid = false;
        }
        if (data.name === "") {
            tempErr.name = getLang === "en" ? "Please enter name" : "कृपया नाव प्रविष्ट करा";
            isValid = false;
        }
        if (data.mobile === "" || !validateMobile(data.mobile)) {
            tempErr.mobile = getLang === "en" ? "Please enter mobile number" : "कृपया मोबाईल प्रविष्ट करा";
            isValid = false;
        }
        if (data.mobile !== "" && data.mobile.length !== 10) {
            tempErr.mobile = getLang === "en" ? "Please enter valid mobile number" : "कृपया मोबाईल प्रविष्ट करा";
            isValid = false;
        }
        if (data.role === "") {
            tempErr.role = getLang === "en" ? "Please select role" : "कृपया रोल निवडा";
            isValid = false;
        }
        if (data.isActive === "") {
            tempErr.isActive = getLang === "en" ? "Please enter is active" : "कृपया निवडा";
            isValid = false;
        }
        if (!searchParams.get('uid')) {
            if (data.password === "" || !validatePassword(data.password)) {
                tempErr.password = getLang === "en" ? "Please enter at least 1 number & special character. password length should be 8 to 16 characters" : "कृपया किमान 1 संख्या आणि विशेष वर्ण प्रविष्ट करा. पासवर्डची लांबी 8 ते 16 वर्ण असावी"
                isValid = false;
            }
            if (data.confirm_password === "" || !validatePassword(data.confirm_password)) {
                tempErr.confirm_password = getLang === "en" ? "Please enter at least 1 number & special character. password length should be 8 to 16 characters" : "कृपया किमान 1 संख्या आणि विशेष वर्ण प्रविष्ट करा. पासवर्डची लांबी 8 ते 16 वर्ण असावी";
                isValid = false;
            }
        }
        setInputErr(tempErr);
        return isValid;
    }
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const getUser = () => {
        axiosInstance.get(`user/user-by-id/${searchParams.get('uid')}`)
            .then((res) => {
                setData(res.data[0][0])
            })
    }
    const handleSubmit = () => {
        if (validateForm()) {
            axiosInstance.post("/user/register/", data)
                .then(res => {
                    if (res.data.status === "success") {
                        setInsertSuccess(res.data.message);
                        setTimeout(() => {
                            setInsertSuccess("");
                            navigate(`/exective`)
                        }, 2000);
                    }
                    if (res.data.status === "faild") {
                        setServerErr(res.data.message);
                        setTimeout(() => {
                            setServerErr("");
                        }, 2000);
                    }
                })
                .catch(err => {
                    // console.log(err);
                })
        }
    }
    const handleUpdate = () => {
        if (validateForm()) {
            axiosInstance.post("/user/update/", data)
                .then(res => {
                    if (res.data.status === "success") {
                        setInsertSuccess(res.data.message);
                        setTimeout(() => {
                            setInsertSuccess("")
                            setTimeout(() => (navigate(`/exective`)), 1000);
                        }, 2000);
                    }
                    if (res.data.status === "faild") {
                        setServerErr(res.data.message);
                        setTimeout(() => {
                            setServerErr("");
                        }, 2000);
                    }
                })
                .catch(err => {
                    // console.log(err);
                })
        }
    }
    const changePassType = () => {
        if (data.passType === "password") {
            setData({ ...data, passType: "text" });
        } else {
            setData({ ...data, passType: "password" });
        }
    };
    const handleReset = () => {
        setData({ ...exectiveSchema })
        setInputErr({ ...exectiveSchema })
    }
    useEffect(() => {
        if (searchParams.get('uid')) {
            getUser();
        }
    }, [])
    return (
        <div className="pt-3">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-11">
                    <div className="card">
                        <div className="card-body">
                            <div className="p-2">
                                <h4 className='mb-3'>{getLabelString('add_exective')}</h4>
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <InputField label={getLabelString("name")} type="text" name="name"
                                            value={data.name}
                                            onChange={handleChange}
                                            err={inputErr.name}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <InputField label={getLabelString("mobile")}
                                            type="number" name="mobile"
                                            value={data.mobile}
                                            onChange={handleChange}
                                            isDisabled={searchParams.get('uid') ? true : false}
                                            err={inputErr.mobile}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <RadioInput label={getLabelString("role")} type="radio"
                                            name="role"
                                            value={data.role}
                                            onChange={(e) => {
                                                setData({ ...data, role: e.target.value })
                                            }}
                                            err={inputErr.role}
                                            options={[{ value: "admin", text: getLabelString('admin') }, { value: "exective", text: getLabelString('exective') }]}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    {
                                        searchParams.get('uid') ? (<div className="col-md-4">
                                            <RadioInput label={getLabelString("status")} type="radio"
                                                name="isActive"
                                                value={data.isActive}
                                                onChange={(e) => {
                                                    setData({ ...data, isActive: e.target.value })
                                                }}
                                                // err={inputErr.isActive}
                                                options={[{ value: 1, text: getLang === "en" ? 'Active' : 'सक्रिय' }, { value: 0, text: getLang === "en" ? 'Deactive' : 'असक्रिय' }]}
                                            />
                                        </div>) : <></>
                                    }
                                    {
                                        !searchParams.get('uid') ? (
                                            <>
                                                <div className="col-md-4">
                                                    <label className="form-label">{getLabelString('password')}</label>
                                                    <div className="input-group input-group-merge">
                                                        <input
                                                            type={data.passType}
                                                            className={
                                                                "form-control" +
                                                                (inputErr.password !== "" ? " is-invalid" : "")
                                                            }
                                                            name="password"
                                                            value={data.password}
                                                            onChange={handleChange}
                                                        />
                                                        <span
                                                            className="input-group-text"
                                                            style={{ cursor: "pointer" }}
                                                            onClick={changePassType}
                                                        >
                                                            <i
                                                                className={`bi ${data.passType === "text"
                                                                    ? "bi-eye-slash-fill"
                                                                    : "bi-eye-fill"
                                                                    }`}
                                                            ></i>
                                                        </span>
                                                        {inputErr.password !== "" ? (
                                                            <div className="invalid-feedback">{inputErr.password}</div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <label className="form-label">
                                                        {getLabelString('confirm_password')}
                                                    </label>
                                                    <div className="input-group input-group-merge">
                                                        <input
                                                            type={data.passType}
                                                            className={
                                                                "form-control" +
                                                                (inputErr.confirm_password !== "" ? " is-invalid" : "")
                                                            }
                                                            name="confirm_password"
                                                            value={data.confirm_password}
                                                            onChange={handleChange}
                                                        />
                                                        <span
                                                            className="input-group-text"
                                                            style={{ cursor: "pointer" }}
                                                            onClick={changePassType}
                                                        >
                                                            <i
                                                                className={`bi ${data.passType === "text"
                                                                    ? "bi-eye-slash-fill"
                                                                    : "bi-eye-fill"
                                                                    }`}
                                                            ></i>
                                                        </span>
                                                        {inputErr.current_password !== "" ? (
                                                            <div className="invalid-feedback">{inputErr.confirm_password}</div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        ) : <></>
                                    }
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
                                        onClick={searchParams.get('uid') ? handleUpdate : handleSubmit}
                                    >
                                        {searchParams.get('uid') ? getLabelString("update") : getLabelString("submit")}
                                    </button>
                                </div>
                                <div className='d-flex justify-content-center pb-0 mt-3'>
                                    {
                                        insertSuccess && (
                                            <div className='alert alert-success'>
                                                <p className='pb-0'>{insertSuccess}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        serverErr !== "" && (
                                            <div className='alert alert-danger'>
                                                <p className='pb-0'>{serverErr}</p>
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
    )
}
