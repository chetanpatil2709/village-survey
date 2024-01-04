import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { axiosInstance } from "../config/api";
import { ToEncrypt } from "../components/CryptoSecure";


export default function Login() {
  const valSchema = {
    mobile: "",
    password: "",
    passType: "password",
  };
  const [cookies, setCookie] = useCookies(["user"]);
  const [auth, setAuth] = useState({ ...valSchema });
  const [error, setError] = useState({ ...valSchema });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");
  const handleChange = (e, name) => {
    if (name === "password" && e.target.value.length >= 17) return false;
    setAuth({ ...auth, [name]: e.target.value });
  };
  const handleSignIn = () => {
    if (validateForm()) {
      axiosInstance
        .post("/user/login/", {
          mobile: auth.mobile,
          password: auth.password,
        })
        .then((res) => {
          if (res.data.status === "success") {
            setCookie("UserName", ToEncrypt(res.data.UserName), { path: "/" });
            setCookie("FullName", ToEncrypt(res.data.FullName), { path: "/" });
            setCookie("UserID", ToEncrypt(res.data.UserID), { path: "/" });
            setCookie("UserType", ToEncrypt(res.data.UserType), { path: "/" });
            setTimeout(() => (window.location.pathname = "/dashboard"), 1000);
          } else if (res.data.status === "faild") {
            setTimeout(() => {
              setAlert(res.data.message);
              setLoading(false);
            }, 1000);
            setTimeout(() => {
              setAlert("");
            }, 3000);
          }
        });
    }
  };
  const validateForm = () => {
    let tempObj = { ...valSchema };
    let isValid = true;
    setLoading(true);
    if (auth.mobile === "") {
      tempObj.mobile = "Please enter mobile";
      isValid = false;
      setLoading(false);
    }
    if (auth.password === "") {
      tempObj.password = "Please enter password";
      isValid = false;
      setLoading(false);
    }
    // else {
    //   tempObj.password = "";
    // }
    setError(tempObj);
    return isValid;
  };
  const changePassType = () => {
    if (auth.passType === "password") {
      setAuth({ ...auth, passType: "text" });
    } else {
      setAuth({ ...auth, passType: "password" });
    }
  };
  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      handleSignIn();
    }
  };
  if (
    cookies.FullName !== undefined ||
    cookies.UserName !== undefined ||
    cookies.UserID !== undefined
  ) {
    window.location.pathname = "/dashboard";
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-md-5 col-lg-6 col-xl-4 px-lg-6 my-5 align-self-center">
            <h3 className="display-6 fw-bold text-center mb-3">Sign in</h3>
            <p className="text-muted text-center mb-5">
              for access to dashboard.
            </p>
            <div className="form-group">
              <label className="form-label">Username/Mobile No</label>
              <input
                type="number"
                className={
                  "form-control" + (error.mobile !== "" ? " is-invalid" : "")
                }
                placeholder="Enter your mobile"
                value={auth.mobile}
                onChange={(e) => handleChange(e, "mobile")}
                onKeyDown={handleKeypress}
              />
              {error.mobile !== "" ? (
                <div className="invalid-feedback">{error.mobile}</div>
              ) : (
                <></>
              )}
            </div>
            <div className="form-group mb-5">
              <label className="form-label d-flex justify-content-between">
                <span>Password</span>
              </label>
              <div className="input-group input-group-merge">
                <input
                  className={
                    "form-control" +
                    (error.password !== "" ? " is-invalid" : "")
                  }
                  type={auth.passType}
                  placeholder="Enter your password"
                  value={auth.password}
                  onChange={(e) => handleChange(e, "password")}
                  onKeyDown={handleKeypress}
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={changePassType}
                >
                  <i
                    className={`bi ${auth.passType === "text"
                      ? "bi-eye-slash-fill"
                      : "bi-eye-fill"
                      }`}
                  ></i>
                </span>
                {error.password !== "" ? (
                  <div className="invalid-feedback">{error.password}</div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            {!loading ? (
              <button
                className="btn btn-lg w-100 btn-primary mb-3"
                style={{ fontSize: 16 }}
                onClick={handleSignIn}
              >
                Sign in
              </button>
            ) : (
              <button
                className="btn btn-lg w-100 btn-primary mb-3 _lding"
                style={{ fontSize: 16 }}
              >
                loading...
              </button>
            )}
            {alert !== "" && loading === false ? (
              <div className="alert alert-danger d-flex justify-content-center">
                <span>{alert}</span>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
