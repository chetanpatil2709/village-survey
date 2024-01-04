import React from 'react';
import getLabelString from '../lang/getLabelString';

export function InputField({ label, type, value, err, isDisabled, ...rest }) {
    console.log(label, value, isDisabled)
    return (
        <div className="form-group">
            <label className="form-label">{label}</label>
            <input
                {...rest}
                type={type}
                min={0}
                disabled={isDisabled}
                value={value || ""}
                className={"form-control " + (err !== "" ? " invalid" : "")}
            />
            {
                err && (
                    <span><small className='text-danger'>{err}</small></span>
                )
            }
        </div>
    )
}

export function DropdownField({ label, value, err, name, options, onChange }) {
    return (
        <div className="form-group">
            <label className="form-label">{label}</label>
            <select name={name} id={name} value={value} onChange={onChange}
                className={"form-control " + (err !== "" ? " invalid" : "")}>
                <option value={0}>{getLabelString("select")}</option>
                {window.location.pathname === '/peoples' ?
                    (<option value={'all'}>{getLabelString("all_peoples")}</option>) : <></>}
                {
                    options?.map((v, index) => (
                        <option value={v.village_id} key={index}>{v.village_name}</option>
                    ))
                }
            </select>
            {
                err && (
                    <span><small className='text-danger'>{err}</small></span>
                )
            }
        </div>
    )
}

export function RadioInput({ label, name, type, options, onChange, value, err }) {
    return (
        <div className="form-group">
            <label className="form-label">{label}</label><br></br>
            <div className='d-flex'>
                {options?.map((option, index) => <React.Fragment key={index}>
                    <input type={type} className="p_cur" name={name} onChange={onChange} id={name + index} value={option.value} checked={option.value?.toString() === value?.toString()} />
                    <label className='ms-1 me-2 p_cur' htmlFor={name + index}>{option.text}</label>
                </React.Fragment>)}
            </div>
            {
                err && err !== "0" && err !== 0 && (
                    <span><small className='text-danger'>{err}</small></span>
                )
            }
        </div>
    )
}

export function AddMoreBtn({ title, name, onclick }) {
    return (
        <button
            className="btn btn-primary mt-2"
            tabIndex={-1}
            onClick={() => onclick({ name })}
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
            <small>{title}</small>
        </button>
    )
}



export const convertDate = (str) => {
    let date = new Date(str);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    if (dt < 10) {
        dt = "0" + dt;
    }
    if (month < 10) {
        month = "0" + month;
    }
    return `${year}-${month}-${dt}`;
};