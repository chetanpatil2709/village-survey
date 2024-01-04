import React, { useEffect, useState } from 'react';
import getLabelString from '../lang/getLabelString';

export default function Language() {
    const [success, setSuccess] = useState("");
    const [err, setErr] = useState("");
    const langSchema = {
        lang: "",
    }
    const [data, setData] = useState({ ...langSchema });
    useEffect(() => {
        if (sessionStorage.getItem('lang')) setData({ ...data, lang: sessionStorage.getItem('lang') })
    }, [sessionStorage])
    const handleSubmit = () => {
        if (data.lang !== "") {
            sessionStorage.setItem('lang', data.lang);
            setErr("")
            setSuccess(data.lang === 'en' ? "Language changed" : "भाषा बदलली")
            setTimeout(() => {
                setSuccess("")
            }, 2000);
        } else {
            setErr(getLabelString('select_lang'))
            setSuccess("")
        }
    }
    return (
        <div className="pt-3">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-11">
                    <div className="card">
                        <div className="card-body">
                            <div className="p-2">
                                <h4 className='mb-3'>{getLabelString('change_lang')}</h4>
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <select
                                            className={"form-control " + (err !== "" ? " invalid" : "")}
                                            onChange={(e) => {
                                                setData({ ...langSchema, lang: e.target.value });
                                            }}
                                            value={data.lang}
                                        >
                                            <option value={'en'}>English</option>
                                            <option value={'mr'}>मराठी</option>
                                        </select>
                                        {
                                            err && (
                                                <span><small className='text-danger'>{err}</small></span>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-4">
                                        <button
                                            className="btn btn-primary d-flex align-items-center"
                                            onClick={handleSubmit}
                                        >
                                            {getLabelString('submit')}
                                        </button>
                                        {
                                            success && (
                                                <span><small className='text-danger'>{success}</small></span>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
