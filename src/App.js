import React, { useEffect } from "react";
import "./App.css";
import { useCookies } from "react-cookie";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./layout/Header";
import Dashboard from "./pages/Dashboard";
import AddVillage from "./pages/villeges/AddVillage";
import AddPeople from "./pages/people/AddPeople";
import Villages from "./pages/villeges/Villages";
import Exective from "./pages/exective/Exective";
import Login from "./pages/Login"
import Peoples from "./pages/people/Peoples";
import AddExective from "./pages/exective/AddExective";
import ChangePass from "./pages/ChangePass";
import Language from "./pages/Language";
import ViewPeople from "./pages/people/ViewPeople";
import ViewVillage from "./pages/villeges/ViewVillage";
import PDFView from "./pdf/PDFView";

function App() {
  const [cookies] = useCookies();
  useEffect(() => {
    if (!sessionStorage.getItem('lang')) sessionStorage.setItem('lang', 'en')
  }, [])
  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/login"
  ) {
    return (
      <>
        <Router>
          <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route exact path="/" element={<Login />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </Router>
      </>
    );
  } else {
    if (
      cookies.FullName === undefined ||
      cookies.UserName === undefined ||
      cookies.UserID === undefined ||
      cookies.UserType === undefined
    ) { window.location.href = "/login"; }
    else {
      return (
        <>
          <Router>
            <Header />
            <div style={{ height: 74 }}></div>
            <main
              className="py-4 container"
              style={{ minHeight: "calc(100vh - (74px + 41px))" }}
            >
              <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/" element={<Dashboard />} />
                <Route exact path="/village/add" element={<AddVillage />} />
                <Route exact path="/villages" element={<Villages />} />
                <Route exact path="/people/add" element={<AddPeople />} />
                <Route exact path="/exective/add" element={<AddExective />} />
                <Route exact path="/exective" element={<Exective />} />
                <Route exact path="/peoples" element={<Peoples />} />
                <Route exact path="/change-pass" element={<ChangePass />} />
                <Route exact path="/change-lang" element={<Language />} />
                <Route exact path="/view" element={<ViewPeople />} />
                <Route exact path="/view-village" element={<ViewVillage />} />
                <Route exact path="/village-details" element={<PDFView />} />
              </Routes>
            </main>
          </Router>
        </>
      );
    }
  }
}

export default App;
