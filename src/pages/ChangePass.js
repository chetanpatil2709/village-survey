import React, { useState } from 'react';
import { axiosInstance } from '../config/api';
import { validatePassword } from '../components/const';
import { useCookies } from "react-cookie";
import { ToDecrypt } from '../components/CryptoSecure';
import { useNavigate } from 'react-router-dom';
import getLabelString from '../lang/getLabelString';

export default function ChangePass() {
    const [Cookies] = useCookies();
    const navigate = useNavigate();
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [serverErr, setServerErr] = useState("");
    const passSchema = {
        user_id: ToDecrypt(Cookies.UserID),
        current_password: "",
        new_password: "",
        new_confirm_password: "",
        passType: "password"
    }
    const [data, setData] = useState({ ...passSchema });
    const [inputErr, setInputErr] = useState({ ...passSchema });
    const validateForm = () => {
        let tempErr = { ...passSchema };
        let isValid = true;
        if (data.current_password === "" || !validatePassword(data.current_password)) {
            tempErr.current_password = getLabelString('password_validate');
            isValid = false;
        }
        if (data.new_password === "" || !validatePassword(data.new_password)) {
            tempErr.new_password = getLabelString('password_validate');
            isValid = false;
        }
        if (data.new_confirm_password === "" || !validatePassword(data.new_confirm_password)) {
            tempErr.new_confirm_password = getLabelString('password_validate');
            isValid = false;
        }
        setInputErr(tempErr);
        return isValid;
    }
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleSubmit = () => {
        if (validateForm()) {
            axiosInstance.post("/user/changepass/", data)
                .then(res => {
                    if (res.data.status === "success") {
                        setUpdateSuccess(true);
                        handleReset();
                        setTimeout(() => {
                            setUpdateSuccess(false);
                            navigate("/dashboard")
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
        setData({ ...passSchema })
        setInputErr({ ...passSchema })
    }
    return (
        <div className="pt-3">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-11">
                    <div className="card">
                        <div className="card-body">
                            <div className="p-2">
                                <h4 className='mb-3'>{getLabelString('change_password')}</h4>
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <label className="form-label">
                                            {getLabelString("current_password")}</label>
                                        <div className="input-group input-group-merge">
                                            <input
                                                type={data.passType}
                                                className={
                                                    "form-control" +
                                                    (inputErr.current_password !== "" ? " is-invalid" : "")
                                                }
                                                name="current_password"
                                                value={data.current_password}
                                                onChange={handleChange}
                                            />
                                            <span
                                                className="input-group-text"
                                                style={{ cursor: "pointer" }}
                                                onClick={changePassType}
                                            >
                                                <i
                                                    className={`bi ${passSchema.passType === "text"
                                                        ? "bi-eye-slash-fill"
                                                        : "bi-eye-fill"
                                                        }`}
                                                ></i>
                                            </span>
                                            {inputErr.current_password !== "" ? (
                                                <div className="invalid-feedback">{inputErr.current_password}</div>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">{getLabelString("new_password")}</label>
                                        <div className="input-group input-group-merge">
                                            <input
                                                type={data.passType}
                                                className={
                                                    "form-control" +
                                                    (inputErr.new_password !== "" ? " is-invalid" : "")
                                                }
                                                name="new_password"
                                                value={data.new_password}
                                                onChange={handleChange}
                                            />
                                            <span
                                                className="input-group-text"
                                                style={{ cursor: "pointer" }}
                                                onClick={changePassType}
                                            >
                                                <i
                                                    className={`bi ${passSchema.passType === "text"
                                                        ? "bi-eye-slash-fill"
                                                        : "bi-eye-fill"
                                                        }`}
                                                ></i>
                                            </span>
                                            {inputErr.new_password !== "" ? (
                                                <div className="invalid-feedback">{inputErr.new_password}</div>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">{getLabelString("new_confirm_password")}</label>
                                        <div className="input-group input-group-merge">
                                            <input
                                                type={data.passType}
                                                className={
                                                    "form-control" +
                                                    (inputErr.new_confirm_password !== "" ? " is-invalid" : "")
                                                }
                                                name="new_confirm_password"
                                                value={data.new_confirm_password}
                                                onChange={handleChange}
                                            />
                                            <span
                                                className="input-group-text"
                                                style={{ cursor: "pointer" }}
                                                onClick={changePassType}
                                            >
                                                <i
                                                    className={`bi ${passSchema.passType === "text"
                                                        ? "bi-eye-slash-fill"
                                                        : "bi-eye-fill"
                                                        }`}
                                                ></i>
                                            </span>
                                            {inputErr.new_confirm_password !== "" ? (
                                                <div className="invalid-feedback">{inputErr.new_confirm_password}</div>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center pt-3">
                                    <button
                                        className="btn btn-secondary me-3"
                                        onClick={handleReset}
                                    >
                                        {getLabelString('reset')}
                                    </button>
                                    <button
                                        className="btn btn-primary d-flex align-items-center"
                                        onClick={handleSubmit}
                                    >
                                        {getLabelString('change_password')}
                                    </button>
                                </div>
                                <div className='d-flex justify-content-center pb-0 mt-3'>
                                    {
                                        serverErr !== "" && (
                                            <div className='alert alert-danger'>
                                                {serverErr === 'Current password is incorrect' ? getLabelString('current_pass_not_validate') : ""}
                                                {serverErr === 'New Password and new confirm password do not match' ? getLabelString('new_pass_not_match') : ""}
                                            </div>
                                        )
                                    }
                                    {
                                        updateSuccess && (
                                            <div className='alert alert-success'>
                                                {getLabelString('password_change_successfully')}
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
