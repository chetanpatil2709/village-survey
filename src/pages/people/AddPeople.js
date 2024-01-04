import React, { useEffect, useState } from 'react';
// import InputField from '../../components/InputField';
import { InputField, DropdownField, RadioInput } from '../../components/shared';
import { axiosInstance } from '../../config/api';
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToDecrypt } from '../../components/CryptoSecure';
import { useCookies } from 'react-cookie';
import getLabelString from '../../lang/getLabelString';

export default function AddPeople() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const getLang = sessionStorage.getItem('lang');
    const [Cookies] = useCookies();
    const [insertSuccess, setInsertSuccess] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const peopleSchema = {
        village_id: "",
        p_name: "",
        mobile: "",
        gender: "",
        nimshashkiy_emp: "0",
        nimshashkiy_position: "",
        political_party_activists: "0",
        political_party_activists_party: "",
        societies_activists_high_edu: "0",
        societies_activists_high_edu_education: "",
        school_stu: "0",
        gp_member_sarpanch: "0",
        former_army_or_family: "0",
        shopkeeper_marchant: "0",
        progressive_farmer: "0",
        created_by: ToDecrypt(Cookies.UserID)
    }
    const [data, setData] = useState({ ...peopleSchema });
    const [villageList, setVillageList] = useState([]);
    useEffect(() => {
        getVillages();
    }, []);
    const getVillages = async () => {
        const response = await axiosInstance.get("/village");
        if (response) {
            setVillageList(response.data[0]);
        }
    };
    const [inputErr, setInputErr] = useState({ ...peopleSchema });
    const validateForm = () => {
        let tempErr = { ...peopleSchema }
        let isValid = true;
        if (data.village_id === 0 || data.village_id === "") {
            tempErr.village_id = getLang === "en" ? "Select village" : "कृपया गाव निवडा";
            isValid = false;
        }
        if (data.p_name === "") {
            tempErr.p_name = getLang === "en" ? "Please enter name" : "कृपया नाव प्रविष्ट करा";
            isValid = false;
        }
        if (data.mobile === "") {
            tempErr.mobile = getLang === "en" ? "Please enter mobile" : "कृपया मोबाईल प्रविष्ट करा";
            isValid = false;
        }
        if (data.mobile !== "" && data.mobile.length !== 10) {
            tempErr.mobile = getLang === "en" ? "Please entervalid mobile number" : "कृपया मोबाईल निवडा";
            isValid = false;
        }
        if (data.gender === "") {
            tempErr.gender = getLang === "en" ? "Please enter gender" : "कृपया लिंग निवडा";
            isValid = false;
        }
        if (data.nimshashkiy_emp === "") {
            tempErr.nimshashkiy_emp = getLang === "en" ? "Please enter nimshashkiy_emp" : "कृपया निमशकीय कर्मचारी निवडा";
            isValid = false;
        }
        if (data.nimshashkiy_position === "" && data.nimshashkiy_emp === 1) {
            tempErr.nimshashkiy_position = getLang === "en" ? "Please enter nimshashkiy_position" : "कृपया निमशकीय कर्मचारी पद प्रविष्ट करा";
            isValid = false;
        }
        if (data.political_party_activists === "") {
            tempErr.political_party_activists = getLang === "en" ? "Please enter political_party_activists" : "कृपया राजकीय पक्षाचे कार्यकर्ते निवडा";
            isValid = false;
        }
        if (data.political_party_activists_party === "" && data.political_party_activists === 1) {
            tempErr.political_party_activists_party = getLang === "en" ? "Please enter political_party_activists_party" : "कृपया राजकीय पक्षाचे कार्यकर्ते पद प्रविष्ट करा";
            isValid = false;
        }
        if (data.societies_activists_high_edu === "") {
            tempErr.societies_activists_high_edu = getLang === "en" ? "Please enter societies_activists_high_edu" : "कृपया उच्च शिक्षित व्यक्ती निवडा";
            isValid = false;
        }
        if (data.societies_activists_high_edu_education === "" && data.societies_activists_high_edu === 1) {
            tempErr.societies_activists_high_edu_education = getLang === "en" ? "Please enter societies_activists_high_edu_education" : "कृपया उच्च शिक्षित व्यक्ती शिक्षण प्रविष्ट करा";
            isValid = false;
        }
        if (data.school_stu === "") {
            tempErr.school_stu = getLang === "en" ? "Please enter school_stu" : "कृपया शालेय विद्यार्थी निवडा";
            isValid = false;
        }
        if (data.gp_member_sarpanch === "") {
            tempErr.gp_member_sarpanch = getLang === "en" ? "Please enter gp_member_sarpanch" : "कृपया ग्रा. प. सरपंच /सदस्य (आजी/माजी) निवडा";
            isValid = false;
        }
        if (data.former_army_or_family === "") {
            tempErr.former_army_or_family = getLang === "en" ? "Please enter former_army_or_family" : "कृपया गावातील माजी सैनिक/ सैनिक कुटुंबे निवडा";
            isValid = false;
        }
        if (data.shopkeeper_marchant === "") {
            tempErr.shopkeeper_marchant = getLang === "en" ? "Please enter shopkeeper_marchant" : "कृपया दुकानदार निवडा";
            isValid = false;
        }
        if (data.progressive_farmer === "") {
            tempErr.progressive_farmer = getLang === "en" ? "Please enter progressive_farmer" : "कृपया प्रगतशील शेतकरी निवडा";
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
            axiosInstance.post("/people/", data)
                .then(res => {
                    setInsertSuccess(true);
                    setTimeout(() => {
                        setInsertSuccess(false);
                        handleReset();
                    }, 2000);

                })
                .catch(err => {
                    //  console.log(err)
                }
                )
        }
    }
    const handleUpdate = () => {
        if (validateForm()) {
            axiosInstance.post(`/people/edit/`, data)
                .then(res => {
                    setUpdateSuccess(true);
                    setTimeout(() => {
                        setInsertSuccess(false);
                    }, 1000);
                    setTimeout(() => (navigate(`/peoples?vid=${data.village_id}`)), 1000);
                })
                .catch(err => {
                    //  console.log(err)
                })
        }
    }
    const getPeople = () => {
        if (searchParams.get('pid')) {
            axiosInstance.get(`/people/by-id/${searchParams.get('pid')}`)
                .then((res) => {
                    setData(res.data[0][0])
                })
        }
    }
    useEffect(() => {
        getPeople()
    }, [])
    const handleReset = () => {
        setData({ ...peopleSchema });
        setInputErr({ ...peopleSchema });
    }
    const handleBack = () => {
        navigate(-1)
    }

    console.log("nimshashkiy_emp", data.nimshashkiy_emp)
    console.log("nimshashkiy_position", data.nimshashkiy_emp === 1 || data.nimshashkiy_emp === "1" ? false : true)

    return (
        <div className="pt-3">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-11">
                    <div className="card">
                        <div className="card-body">
                            <div className="p-2">
                                <div className='d-flex justify-content-between'>
                                    <h4 className='mb-3'>{getLabelString('add_people')}</h4>
                                    <button className='btn btn-primary' onClick={handleBack}>{getLabelString('back_page')}</button>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <DropdownField label={getLabelString("village")}
                                            name="village_id"
                                            value={data.village_id}
                                            onChange={(e) => {
                                                setData({ ...data, village_id: e.target.value })
                                            }}
                                            options={villageList}
                                            err={inputErr.village_id}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <InputField label={getLabelString("name")} type="text" name="p_name"
                                            value={data.p_name}
                                            onChange={handleChange}
                                            err={inputErr.p_name}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <InputField label={getLabelString("mobile")} type="number" name="mobile"
                                            value={data.mobile}
                                            onChange={handleChange}
                                            err={inputErr.mobile}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <RadioInput label={getLabelString("gender")} type="radio" name="gender"
                                            value={data.gender}
                                            onChange={(e) => {
                                                setData({ ...data, gender: e.target.value })
                                            }}
                                            err={inputErr.gender}
                                            options={[{ value: "Male", text: 'Male' }, { value: "Female", text: 'Female' }, { value: "Other", text: "Other" }]}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <RadioInput label={getLabelString("nimshashkiy_emp")} type="radio" name="nimshashkiy_emp"
                                            value={data.nimshashkiy_emp}
                                            onChange={(e) => {
                                                setData({ ...data, nimshashkiy_emp: e.target.value, nimshashkiy_position: "" })
                                            }}
                                            err={inputErr.nimshashkiy_emp}
                                            options={[{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }]}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <InputField label={getLabelString("nimshashkiy_position")}
                                            type="text" name="nimshashkiy_position"
                                            id="nimshashkiy_position"
                                            value={data.nimshashkiy_position}
                                            onChange={handleChange}
                                            isDisabled={data.nimshashkiy_emp === 1 || data.nimshashkiy_emp === "1" ? false : true}
                                            err={inputErr.nimshashkiy_position}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <RadioInput label={getLabelString("political_party_activists")} type="radio" name="political_party_activists"
                                            value={data.political_party_activists}
                                            onChange={(e) => {
                                                setData({ ...data, political_party_activists: e.target.value, political_party_activists_party: "" })
                                            }}
                                            err={inputErr.political_party_activists}
                                            options={[{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }]}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <InputField label={getLabelString("political_party_activists_party")} type="text" name="political_party_activists_party"
                                            value={data.political_party_activists_party}
                                            onChange={handleChange}
                                            isDisabled={data.political_party_activists === 1 || data.political_party_activists === "1" ? false : true}
                                            err={inputErr.political_party_activists_party} />
                                    </div>
                                    <div className="col-md-4">
                                        <RadioInput label={getLabelString("societies_activists_high_edu")} type="radio" name="societies_activists_high_edu"
                                            value={data.societies_activists_high_edu}
                                            onChange={(e) => {
                                                setData({ ...data, societies_activists_high_edu: e.target.value, societies_activists_high_edu_education: "" })
                                            }}
                                            err={inputErr.societies_activists_high_edu}
                                            options={[{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }]}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <InputField label={getLabelString("societies_activists_high_edu_education")} type="text" name="societies_activists_high_edu_education"
                                            value={data.societies_activists_high_edu_education}
                                            onChange={handleChange}
                                            isDisabled={data.societies_activists_high_edu === 1 || data.societies_activists_high_edu === "1" ? false : true}
                                            err={inputErr.societies_activists_high_edu_education}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <RadioInput label={getLabelString("school_stu")} type="radio" name="school_stu"
                                            value={data.school_stu}
                                            onChange={handleChange}
                                            err={inputErr.school_stu}
                                            options={[{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }]}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <RadioInput label={getLabelString("gp_member_sarpanch")} type="radio" name="gp_member_sarpanch"
                                            value={data.gp_member_sarpanch}
                                            onChange={handleChange}
                                            err={inputErr.gp_member_sarpanch}
                                            options={[{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }]}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <RadioInput label={getLabelString("former_army_or_family")} type="radio" name="former_army_or_family"
                                            value={data.former_army_or_family}
                                            onChange={handleChange}
                                            err={inputErr.former_army_or_family}
                                            options={[{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }]} />
                                    </div>
                                    <div className="col-md-4">
                                        <RadioInput label={getLabelString("shopkeeper_marchant")} type="radio" name="shopkeeper_marchant"
                                            value={data.shopkeeper_marchant}
                                            onChange={handleChange}
                                            err={inputErr.shopkeeper_marchant}
                                            options={[{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }]}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <RadioInput label={getLabelString("progressive_farmer")} type="radio" name="progressive_farmer"
                                            value={data.progressive_farmer}
                                            onChange={handleChange}
                                            err={inputErr.progressive_farmer}
                                            options={[{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }]}
                                        />
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
                                        onClick={searchParams.get('pid') ? handleUpdate : handleSubmit}
                                    >
                                        {searchParams.get('pid') ? getLabelString("update") : getLabelString("submit")}
                                    </button>
                                </div>
                                <div className='d-flex justify-content-center pb-0 mt-3'>
                                    {
                                        insertSuccess && (
                                            <div className='alert alert-success'>
                                                {getLabelString('people_inserted')}
                                            </div>
                                        )
                                    }
                                    {
                                        updateSuccess && (
                                            <div className='alert alert-success'>
                                                {getLabelString('people_inserted')}
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
