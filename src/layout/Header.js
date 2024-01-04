import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { ToDecrypt } from "../components/CryptoSecure";
import getLabelString from '../lang/getLabelString';

export default function Header() {
  const logoutLink = useRef(0);
  const mobileMenuRef = useRef(0);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [hamMenu, setHamMenu] = useState(null)
  const [header, setHeader] = useState({
    name: "",
    date: "",
    month: "",
    year: "",
    day: "",
    time: "",
  });
  useEffect(() => {
    setInterval(() => startClock(), 1000);
  }, [cookies]);
  const handleMenuItemClick = (e) => {
    const li = e.target.parentElement.parentElement.children;
    for (var i = 0; i < li.length; i++) {
      li[i].children[0].classList.remove("active");
      e.target.classList.add("active");
      if (e.target.parentElement.classList.match("menuSub"))
        e.target.parentElement.parentElement.children[0].classList.add(
          "active"
        );
    }
  };
  const startClock = () => {
    const date = new Date();
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    const time = date.getDate();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM";
    if (hh == 0) {
      hh = 12;
    }
    if (hh > 12) {
      hh = hh - 12;
      session = "PM";
    }
    hh = hh < 10 ? "0" + hh : hh;
    mm = mm < 10 ? "0" + mm : mm;
    ss = ss < 10 ? "0" + ss : ss;

    setHeader({
      ...header,
      date: `${day} ${month} ${year} ${hh}:${mm}:${ss} ${session}`,
    });
  };
  const handleLogOut = (e) => {
    e.preventDefault();
    removeCookie("UserName");
    removeCookie("FullName");
    removeCookie("UserID");
    removeCookie("UserType");
    window.location.href = "/login";
  };
  const handleMenu = () => {
    setHamMenu(true)
  }
  useEffect(() => {
    if (hamMenu === true) {
      mobileMenuRef.current.classList.remove('-start-100');
      mobileMenuRef.current.classList.add('start-0');
    } else if (hamMenu === false) {
      mobileMenuRef.current.classList.remove('start-0');
      mobileMenuRef.current.classList.add('-start-100');
    }
  }, [hamMenu])
  const renderUserDetails = <div className="user d-flex align-self-center">
    <div className="d-flex align-items-center">
      <div className="pe-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-person-circle"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path
            fillRule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
          />
        </svg>
      </div>
      <div
        style={{
          position: "relative",
          top: -3,
        }}
      >
        <small>{getLabelString('welcome')}..!</small>
        <div className="d-flex m-auto">
          <div className="userName">
            <span className="me-2">
              {cookies.FullName ?
                ToDecrypt(cookies.FullName).toString().replace(`"`, "").replace(`"`, "") : ""}
            </span>
            (<span>{cookies.UserType ?
              ToDecrypt(cookies.UserType)
                .toString().replace(`"`, " ").replace(`"`, " ") : ""}</span>)
          </div>
        </div>
      </div>
    </div>
  </div>
  const menuArr = [{
    href: '/dashboard',
    title: getLabelString("dashboard")
  }, {
    href: '/villages',
    title: getLabelString("village")
  }, {
    href: '/peoples',
    title: getLabelString("people")
  }, {
    title: getLabelString("more"),
    children: [
      {
        href: '/exective',
        title: getLabelString("exective"),
        allow: 'admin'
      }, {
        href: '/change-lang',
        title: getLabelString("change_lang")
      }, {
        href: '/change-pass',
        title: getLabelString("change_password")
      },
    ]
  }]
  return (
    <>
      <header className="header">
        <div className="topBar">
          <div className="container d-flex justify-content-between">
            <span className="text-white time-span">{header.date}</span>
            <a href="/" className="d-flex" onClick={handleLogOut}>
              <i className="bi bi-power me-1"></i>
              {getLabelString('logout')}
            </a>
          </div>
        </div>
        <div className="mainHeader">
          <div className="container text-white">
            <div className="d-flex justify-content-between">
              <div className="d-flex gap-3 align-items-center logo">
                {window.screen.width <= 767 && <i className="bi bi-list ham-menu" onClick={handleMenu}></i>}
                <Link to="/dashboard">
                  <span className="logoText">
                    survey
                  </span>
                </Link>
              </div>
              {
                window.screen.width >= 768 && (
                  <div className="menus">
                    <ul className="menuUl">
                      <li className="menuLi">
                        <Link
                          to="/dashboard"
                          className={
                            window.location.pathname === "/dashboard"
                              ? "active"
                              : ""
                          }
                        >
                          <span>{getLabelString("dashboard")}</span>
                        </Link>
                      </li>
                      <li className="menuLi">
                        <Link
                          to="/villages"
                          className={
                            window.location.pathname === "/villages"
                              ? "active"
                              : ""
                          }
                        >
                          <span>{getLabelString("village")}</span>
                        </Link>
                      </li>
                      <li className="menuLi">
                        <Link
                          to="/peoples"
                          className={
                            window.location.pathname === "/peoples"
                              ? "active"
                              : ""
                          }
                        >
                          <span>{getLabelString("people")}</span>
                        </Link>
                      </li>
                      <li className="menuLi">
                        <button
                          className={`border-0 ${window.location.pathname.match("/add-quotation/")
                            ? "active"
                            : ""
                            }`}
                        >
                          <span>{getLabelString('more')}</span>
                        </button>
                        <div className="menuSub">

                          {
                            ToDecrypt(cookies.UserType) === `"admin"` ? (
                              <Link
                                to="/exective"
                                className={
                                  window.location.pathname.match("/exective")
                                    ? "active"
                                    : ""
                                }
                              >
                                <span>{getLabelString('exective')}</span>
                              </Link>
                            ) : (<></>)
                          }
                          <Link
                            to="/change-lang"
                            className={
                              window.location.pathname.match("/change-lang")
                                ? "active"
                                : ""
                            }
                          >
                            <span>{getLabelString('change_lang')}</span>
                          </Link>
                          <Link
                            to="/change-pass"
                            className={
                              window.location.pathname.match("/change-pass")
                                ? "active"
                                : ""
                            }
                          >
                            <span>{getLabelString('change_password')}</span>
                          </Link>
                        </div>
                      </li>
                    </ul>
                  </div>
                )
              }
              {window.screen.width >= 768 && renderUserDetails}

              {window.screen.width <= 768 && <div className="position-fixed -start-100 bottom-0 top-0 w-100 bg-black bg-opacity-50 d-flex align-items-start" style={{ zIndex: 1090 }} ref={mobileMenuRef}>
                <div className="mobile-menu-inner">
                  <div className="w-100 py-1 px-3 border-bottom mb-3">
                    {renderUserDetails}
                  </div>
                  <ul className="mobile-menu-list">
                    {menuArr.map((menu, idx) => !menu.children ? <li key={idx}>
                      <Link
                        to={menu.href}
                        className={
                          `px-3 py-2 ${window.location.pathname === menu.href
                            ? "active"
                            : ""}`
                        }
                      >
                        <span>{menu.title}</span>
                      </Link>
                    </li> : <React.Fragment key={idx}><li className="heading"><strong>{menu.title}</strong></li>
                      {menu.children?.map((child, idxx) => <li key={idxx} className="child">
                        <Link
                          to={child.href}
                          className={
                            `px-3 py-2 ${window.location.pathname === child.href
                              ? "active"
                              : ""}`
                          }
                        >
                          <span>{child.title}</span>
                        </Link>
                      </li>)}
                    </React.Fragment>)}
                  </ul>
                </div>
                <button onClick={() => setHamMenu(false)}>
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
